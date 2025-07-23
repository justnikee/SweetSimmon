import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
       title: 'NOURISHING FACE OIL',
      slug: 'nourishing-face-oil',
      description:
        'A blend of radiance boosting Nordic super berries and therapeutic flowers: replenishing Lingonberry, soothing Sea Buckthorn, calming Chamomile and an abundance of antioxidants, vitamins and Omega-3, -6, -7 and -9.',
      price: 98,
      images: [
        'https://res.cloudinary.com/dobgcbtab/image/upload/v1751133525/Aevi-Website-Products-NourishingFaceOil-Awards_2b0bd624-a72a-44c6-b5ae-fc903dd73fa6_tdy28c.webp',
        'https://res.cloudinary.com/dobgcbtab/image/upload/v1751133525/Aevi-Website-Products-NourishingFaceOil-09_jku4uq.webp',
      ],
      inStock: true,
      category: {
        connect: { id: 2 },
      },
      isSubscribable: true,
      subscriptionDiscountPercent: 15,
      subscriptionInterval: '30',
      benefits: [
        'CALMS IRRITATION',
        'SOOTHES SENSITIVITY',
        'DEEPLY NOURISHING',
        'BOOSTS REPAIR',
        'BARRIER STRENGTHENING',
        'NON-COMEDOGENIC',
      ],
      skinTypes: [
        'Dry Skin',
        'Dull Skin',
        'Sensitive or Reactive Skin',
        'Winter and Sun-Damage',
      ],
      volume: '30 ml / 1 fl oz',
      details:
        'Dermatologist-Tested. Clinically Proven. Suitable for Sensitive Skin. Pregnancy Safe. Certified Vegan and Cruelty-Free.',
      keyIngredients:
        'The Nourishing Face Oil is specially formulated to soothe, protect and restore even the most sensitive and reactive skin. The oil is packed with nature’s antioxidants, vitamins and a rare mix of essential fatty acids to deeply nourish, reduce inflammation and enhance resilience by strengthening the skin barrier.  Lingonberry Sea Buckthorn Chamomile Bisabolol Vitamin C Vitamin E Omega-3, -6, -7 and -9 Vitamins, Antioxidants and Omegas are derived from natural plant oils.',
      clinicalStudies:
        'In an independent, consumer perception study, women and men, loved the results they got using Aevi’s Nourishing Face Oil –  95% said their skin felt more hydrated and moisturized 95% said the face oil deeply nourished their skin 82% said their skin looked and felt smoother 100% of participants showed improvement in hydration and strengthening of the skin barrier Moreover, it was shown to decrease transepidermal water loss by up to 16% — thus reinforcing the hydro-lipid layer of the skin.   * these results are drawn from a dermatologist controlled, third-party study of women and men, ages eighteen plus, of all skin types – including 31% of participants with sensitive skin.  Read more on our journal article here.',
      howToUse:
        'Apply over serum, all over face, morning and night, or as often as needed.  Ideal for use with beauty tools and facial massage. Non-comedogenic.',
      fullIngredients:
        'Helianthus Annuus (Sunflower) Seed Oil*, Castor Isostearate Succinate, Simmondsia Chinensis (Jojoba) Seed Oil*, Borago Officinalis (Starflower) Seed Oil, Vaccinium Vitis-Idaea (Lingonberry) Seed Oil, Bisabolol (from Candeia Wood), Tocopherol (Vitamin E), Hippophae Rhamnoides (Sea Buckthorn) Oil, Rosa Damascena (Rose) Flower Oil, Anthemis Nobilis (Chamomile) Flower Oil, Limonene**, Citronellol**, Eugenol**, Geraniol**.   *Certified Organic. **Naturally occurring in essential oils.',
      sustainablePackaging:
        'Packaged in a recyclable, refillable glass bottle. The box is made from 100% used paper and printed with vegetable-based ink. Please continue the cycle and recycle.',
    },
    {
      title: 'Face Oil B',
      description: 'Nourishing face oil',
      price: 1400,
      images: ['https://url.com/image2.png'],
      inStock: true,
    },
  ];

  await prisma.product.createMany({
    data: products,
  });

  console.log('Seeded products successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
