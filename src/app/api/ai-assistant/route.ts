import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PROVIDERS } from '@/lib/data/mockData';
import { ServiceCategoryId } from '@/lib/types';

interface AIResponseData {
  service_category: ServiceCategoryId;
  category_name: string;
  issue_summary: string;
  location: string;
  urgency: 'emergency' | 'today' | 'scheduled';
  estimated_cost_pkr: {
    min: number;
    max: number;
    callout_fee: number;
  };
  diagnostic_points: string[];
  missing_details: string[];
  matched_providers: typeof MOCK_PROVIDERS;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, area = 'Mingora City', language = 'en' } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid problem prompt is required' }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    let parsedCategory: ServiceCategoryId = 'ac_technician';
    let urgency: 'emergency' | 'today' | 'scheduled' = 'today';
    let detectedLocation: string = area;
    let diagnosticPoints: string[] = [];
    let missingDetails: string[] = [];
    let issueSummary = prompt;

    // 1. If OpenAI API Key is configured, attempt call
    if (openaiApiKey && !openaiApiKey.includes('your-openai-api-key')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            response_format: { type: 'json_object' },
            messages: [
              {
                role: 'system',
                content: `You are the AI triage dispatch engine for KaamSaathi, a verified home services marketplace in Swat, Pakistan.
Parse customer queries in Urdu, Roman Urdu, or English.
Return JSON with format:
{
  "service_category": "ac_technician" | "electrician" | "plumber" | "carpenter" | "cleaner" | "appliance_repair",
  "issue_summary": "Concise summary",
  "location": "Swat town (e.g. Mingora City, Saidu Sharif, Kanju, Kabal, Matta, Barikot, etc.)",
  "urgency": "emergency" | "today" | "scheduled",
  "estimated_min_pkr": number,
  "estimated_max_pkr": number,
  "diagnostic_points": ["point 1", "point 2"],
  "missing_details": ["clarification 1"]
}`
              },
              {
                role: 'user',
                content: `Customer Query: "${prompt}" (Default Area: ${area})`
              }
            ],
            temperature: 0.2
          })
        });

        if (response.ok) {
          const aiJson = await response.json();
          const parsed = JSON.parse(aiJson.choices[0].message.content);
          if (parsed.service_category) parsedCategory = parsed.service_category;
          if (parsed.urgency) urgency = parsed.urgency;
          if (parsed.location) detectedLocation = parsed.location;
          if (parsed.issue_summary) issueSummary = parsed.issue_summary;
          if (Array.isArray(parsed.diagnostic_points)) diagnosticPoints = parsed.diagnostic_points;
          if (Array.isArray(parsed.missing_details)) missingDetails = parsed.missing_details;
        }
      } catch (err) {
        console.warn('OpenAI request failed, falling back to local NLP heuristic:', err);
      }
    }

    // 2. Resilient Rule-based NLP classifier fallback (handles Urdu, Roman Urdu, English)
    const lowerPrompt = prompt.toLowerCase();

    // Category detection
    if (
      lowerPrompt.includes('ac') ||
      lowerPrompt.includes('cool') ||
      lowerPrompt.includes('gas') ||
      lowerPrompt.includes('compressor') ||
      lowerPrompt.includes('ٹھنڈک') ||
      lowerPrompt.includes('انویرٹر') ||
      lowerPrompt.includes('کولنگ')
    ) {
      parsedCategory = 'ac_technician';
      diagnosticPoints = [
        'Check R410A / R32 refrigerant pressure gauge',
        'Inspect outer condenser unit airflow & clean mud deposits',
        'Diagnose indoor evaporator sensor and PCB communication error'
      ];
      missingDetails = ['Is the outdoor unit compressor humming or silent?'];
    } else if (
      lowerPrompt.includes('solar') ||
      lowerPrompt.includes('bijli') ||
      lowerPrompt.includes('wire') ||
      lowerPrompt.includes('wairing') ||
      lowerPrompt.includes('short') ||
      lowerPrompt.includes('ups') ||
      lowerPrompt.includes('breaker') ||
      lowerPrompt.includes('بجلی') ||
      lowerPrompt.includes('تار') ||
      lowerPrompt.includes('سولر')
    ) {
      parsedCategory = 'electrician';
      diagnosticPoints = [
        'Perform multi-meter continuity test for phase-neutral short circuit',
        'Verify distribution box (DB) miniature breaker load rating',
        'Inspect UPS inverter battery charging voltage (13.8V - 14.4V)'
      ];
      missingDetails = ['Is any breaker tripping immediately upon turning on?'];
    } else if (
      lowerPrompt.includes('motor') ||
      lowerPrompt.includes('pani') ||
      lowerPrompt.includes('leak') ||
      lowerPrompt.includes('pipe') ||
      lowerPrompt.includes('geyser') ||
      lowerPrompt.includes('tanki') ||
      lowerPrompt.includes('پلمبر') ||
      lowerPrompt.includes('پانی') ||
      lowerPrompt.includes('موٹر') ||
      lowerPrompt.includes('گیزر')
    ) {
      parsedCategory = 'plumber';
      diagnosticPoints = [
        'Test water pump capacitor and mechanical seal for suction loss',
        'Check geyser thermostat valve and pilot flame jet',
        'Inspect exposed and concealed PPRC hot/cold joints'
      ];
      missingDetails = ['Is the water motor tripping the breaker or just making humming noise?'];
    } else if (
      lowerPrompt.includes('darwaza') ||
      lowerPrompt.includes('door') ||
      lowerPrompt.includes('lock') ||
      lowerPrompt.includes('wood') ||
      lowerPrompt.includes('lakri') ||
      lowerPrompt.includes('cabinet') ||
      lowerPrompt.includes('furniture') ||
      lowerPrompt.includes('لکڑی') ||
      lowerPrompt.includes('دروازہ') ||
      lowerPrompt.includes('تالا')
    ) {
      parsedCategory = 'carpenter';
      diagnosticPoints = [
        'Inspect wood swelling due to Swat valley winter moisture',
        'Realign hydraulic hinge and replace worn cylinder pins',
        'Assess deodar / solid pine framing stability'
      ];
      missingDetails = ['Is the lock jammed or does the door scrape the floor?'];
    } else if (
      lowerPrompt.includes('tank') ||
      lowerPrompt.includes('wash') ||
      lowerPrompt.includes('clean') ||
      lowerPrompt.includes('safai') ||
      lowerPrompt.includes('sofa') ||
      lowerPrompt.includes('صفائی') ||
      lowerPrompt.includes('ٹینک')
    ) {
      parsedCategory = 'cleaner';
      diagnosticPoints = [
        'Drain tank base silt using submerged mud pump',
        'Chlorine scrub walls to remove microbial algae and moss',
        'UV water sanitization spray after freshwater rinse'
      ];
      missingDetails = ['Is the water tank underground or rooftop RCC?'];
    } else if (
      lowerPrompt.includes('machine') ||
      lowerPrompt.includes('fridge') ||
      lowerPrompt.includes('microwave') ||
      lowerPrompt.includes('generator') ||
      lowerPrompt.includes('اوون') ||
      lowerPrompt.includes('واشنگ')
    ) {
      parsedCategory = 'appliance_repair';
      diagnosticPoints = [
        'Check electronic motherboard error code sequence',
        'Inspect drum drive belt tension and drain solenoid',
        'Verify magnetron high-voltage diode and capacitor'
      ];
      missingDetails = ['What is the exact brand and model of the appliance?'];
    }

    // Urgency heuristic
    if (
      lowerPrompt.includes('urgent') ||
      lowerPrompt.includes('emergency') ||
      lowerPrompt.includes('foran') ||
      lowerPrompt.includes('jaldi') ||
      lowerPrompt.includes('ابھی') ||
      lowerPrompt.includes('فوری') ||
      lowerPrompt.includes('short circuit')
    ) {
      urgency = 'emergency';
    }

    // Location heuristic detection
    const swatTowns = [
      'Mingora City',
      'Saidu Sharif',
      'Kanju Township',
      'Kabal',
      'Matta',
      'Barikot',
      'Khwazakhela',
      'Charbagh',
      'Faizabad',
      'Rahimabad'
    ];
    for (const town of swatTowns) {
      if (lowerPrompt.includes(town.toLowerCase().split(' ')[0])) {
        detectedLocation = town;
        break;
      }
    }

    // Cost estimation based on category
    const costMap: Record<ServiceCategoryId, { min: number; max: number; fee: number }> = {
      ac_technician: { min: 2000, max: 4500, fee: 500 },
      electrician: { min: 1200, max: 3000, fee: 400 },
      plumber: { min: 1000, max: 2800, fee: 350 },
      carpenter: { min: 1500, max: 3800, fee: 450 },
      cleaner: { min: 2500, max: 6000, fee: 600 },
      appliance_repair: { min: 1400, max: 3500, fee: 400 }
    };

    const cost = costMap[parsedCategory];

    // Match top providers for this category & area
    const matchedProviders = MOCK_PROVIDERS.filter((p) => p.category === parsedCategory)
      .sort((a, b) => {
        // Boost if matches area
        const aAreaMatch = a.serviceAreas.some((ar) =>
          ar.toLowerCase().includes(detectedLocation.toLowerCase().split(' ')[0])
        )
          ? 1
          : 0;
        const bAreaMatch = b.serviceAreas.some((ar) =>
          ar.toLowerCase().includes(detectedLocation.toLowerCase().split(' ')[0])
        )
          ? 1
          : 0;
        return bAreaMatch - aAreaMatch || b.rating - a.rating;
      })
      .slice(0, 3);

    const categoryNames: Record<ServiceCategoryId, string> = {
      ac_technician: 'AC & Cooling Specialist',
      electrician: 'Electrician & Solar Specialist',
      plumber: 'Plumber & Water Specialist',
      carpenter: 'Carpenter & Wood Craftsman',
      cleaner: 'Deep Cleaning & Water Tank Specialist',
      appliance_repair: 'Home Appliance & Generator Specialist'
    };

    const responsePayload: AIResponseData = {
      service_category: parsedCategory,
      category_name: categoryNames[parsedCategory],
      issue_summary: issueSummary,
      location: detectedLocation,
      urgency: urgency,
      estimated_cost_pkr: {
        min: cost.min,
        max: cost.max,
        callout_fee: cost.fee
      },
      diagnostic_points: diagnosticPoints,
      missing_details: missingDetails,
      matched_providers: matchedProviders
    };

    return NextResponse.json(responsePayload);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
