-- ==============================================================================
-- KaamSaathi (کام ساتھی) Supabase Database Schema & Seed Data
-- Region: Swat, Khyber Pakhtunkhwa, Pakistan
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'provider', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE urgency_level AS ENUM ('emergency', 'today', 'scheduled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status_type AS ENUM (
        'requested',
        'accepted',
        'technician_assigned',
        'in_transit',
        'arrived',
        'in_progress',
        'completed',
        'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status_type AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'customer',
    city TEXT DEFAULT 'Swat',
    area TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROVIDERS TABLE
CREATE TABLE IF NOT EXISTS providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    business_title TEXT NOT NULL,
    primary_category TEXT NOT NULL,
    cnic_number TEXT NOT NULL UNIQUE,
    cnic_verified BOOLEAN DEFAULT FALSE,
    trade_verified BOOLEAN DEFAULT FALSE,
    police_cleared BOOLEAN DEFAULT FALSE,
    rating_avg NUMERIC(3, 2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    total_jobs_done INT DEFAULT 0,
    hourly_rate_pkr INT NOT NULL DEFAULT 1000,
    callout_fee_pkr INT NOT NULL DEFAULT 400,
    response_time_mins INT DEFAULT 30,
    years_experience INT DEFAULT 5,
    area TEXT NOT NULL,
    service_areas JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    is_available_now BOOLEAN DEFAULT TRUE,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    category_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    base_price_pkr INT NOT NULL,
    estimated_duration_mins INT DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES providers(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    urgency urgency_level DEFAULT 'today',
    scheduled_time TIMESTAMPTZ,
    area TEXT NOT NULL,
    address_detail TEXT NOT NULL,
    landmark TEXT,
    status booking_status_type DEFAULT 'requested',
    estimated_cost_min INT NOT NULL,
    estimated_cost_max INT NOT NULL,
    final_cost_pkr INT,
    payment_method TEXT DEFAULT 'cash_on_completion',
    ai_diagnostic JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. QUOTES TABLE
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    parts_cost_pkr INT DEFAULT 0,
    labor_cost_pkr INT NOT NULL,
    total_amount_pkr INT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    location TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. VERIFICATIONS TABLE (CNIC & Skill Audit)
CREATE TABLE IF NOT EXISTS verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- 'cnic_front', 'cnic_back', 'trade_cert', 'police_cert'
    document_url TEXT NOT NULL,
    status verification_status_type DEFAULT 'pending',
    reviewer_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. MESSAGES TABLE (Booking Chat)
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view, user can edit own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Providers: Public read
CREATE POLICY "Providers are viewable by everyone" ON providers FOR SELECT USING (true);
CREATE POLICY "Providers can update own info" ON providers FOR UPDATE USING (auth.uid() = profile_id);

-- Bookings: User can see their own bookings; Provider can see assigned bookings
CREATE POLICY "Customers see own bookings" ON bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Providers see assigned bookings" ON bookings FOR SELECT USING (
    EXISTS (SELECT 1 FROM providers WHERE providers.id = bookings.provider_id AND providers.profile_id = auth.uid())
);
CREATE POLICY "Customers can insert bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Reviews: Public read, booking participants can insert
CREATE POLICY "Reviews viewable by everyone" ON reviews FOR SELECT USING (true);

-- 13. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_providers_category ON providers(primary_category);
CREATE INDEX IF NOT EXISTS idx_providers_area ON providers(area);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_provider ON bookings(provider_id);

-- ==============================================================================
-- REALISTIC SEED DATA (Swat Region: Mingora, Saidu Sharif, Kanju, Matta, Barikot)
-- ==============================================================================

-- (Profiles, Providers, and Initial Reviews are seeded for immediate showcase)
