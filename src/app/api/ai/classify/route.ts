import { NextRequest, NextResponse } from 'next/server';
import { GEO_ENTITIES } from '@/core/lib/data/ai-data';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const image = formData.get('image');
        const lat = parseFloat(formData.get('lat') as string) || 26.1445;
        const lng = parseFloat(formData.get('lng') as string) || 91.7362;

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Mock AI Classification Logic
        // In a real scenario, this would call a Python service or use a WASM model.
        const mockMaterials = [
            { id: 'plastic', display_name: 'Plastic Bottle', confidence: 0.92, decision: 'RECYCLABLE' },
            { id: 'paper', display_name: 'Cardboard Box', confidence: 0.88, decision: 'RECYCLABLE' },
            { id: 'metal', display_name: 'Aluminum Can', confidence: 0.94, decision: 'RECYCLABLE' },
            { id: 'organic', display_name: 'Food Scraps', confidence: 0.85, decision: 'NOT_RECYCLABLE' },
            { id: 'e_waste', display_name: 'Electronic Component', confidence: 0.91, decision: 'RECYCLABLE' }
        ];

        const randomMaterial = mockMaterials[Math.floor(Math.random() * mockMaterials.length)];

        // Filter nearby options based on material and decision
        const nearbyOptions = GEO_ENTITIES.filter(entity => {
            if (randomMaterial.decision === 'RECYCLABLE') {
                return entity.accepts.includes(randomMaterial.id);
            }
            return false;
        }).slice(0, 3);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json({
            decision: randomMaterial.decision,
            decision_confidence: "HIGH",
            needs_user_confirmation: false,
            material: {
                id: randomMaterial.id,
                display_name: randomMaterial.display_name,
                confidence: randomMaterial.confidence
            },
            nearby_options: nearbyOptions,
            alternatives: [
                {
                    id: 'misc',
                    display_name: 'Mixed Waste',
                    confidence: 0.05
                }
            ],
            meta: {
                model: "YUKTI-Mock-AI v1.0",
                mode: "inference",
                version: "v1"
            }
        });

    } catch (error) {
        console.error('AI Classification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
