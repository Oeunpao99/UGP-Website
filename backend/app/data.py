"""Static catalogue data for UPG PIPE CO., LTD.

All content mirrors the 2026 product catalogue as published in the
design prototype. In a real deployment these records would live in a
database; this module keeps the demo self-contained.
"""

# ------------------------------------------------------------------
# Products
# ------------------------------------------------------------------
PRODUCTS = [
    {
        "id": "upvc",
        "name": "uPVC pressure pipe",
        "brands": ["Eagle", "Lion Head", "Smart"],
        "color": "var(--c-upvc)",
        "meta": 'Class 13.5 & 8.5 · 1/2"–12" · 4 m lengths',
        "legend": "EAGLE uPVC PIPE ISO 9001:2015 · PRODUCT OF CAMBODIA",
        "name_km": "បំពង់សម្ពាធ uPVC",
        "meta_km": 'ថ្នាក់ 13.5 និង 8.5 · 1/2"–12" · ប្រវែង 4 ម',
        "blurb_km": (
            "ឆ្អឹងខ្នងនៃបញ្ជីផលិតផល។ PVC ដែលមិនមានជ័រទន់ សម្រាប់ផ្គត់ផ្គង់ទឹកត្រជាក់ "
            "ប្រព័ន្ធលូ និងស្រោចស្រព — ស្រាលងាយស្រួលកាន់ ភ្ជាប់ដោយកាវសូលវ៉េន ហើយគ្មានជាតិពុល "
            "ដូច្នេះសុវត្ថិភាពសម្រាប់ទឹកស្អាត។ ការច្រេះមិនអាចប៉ះវាបានទេ ហើយដីសមិនកកនៅក្នុង "
            "បំពង់ទេ ដូច្នេះលំហូរទឹកនៅតែដូចដែលអ្នករចនាបានកំណត់។"
        ),
        "tags_km": ["ផ្គត់ផ្គង់ទឹកត្រជាក់", "ប្រព័ន្ធលូ", "ស្រោចស្រព", "សន្ទះពន្លត់អគ្គីភ័យ", "ដឹកសារធាតុគីមី"],
        "specTitle_km": "ទំហំបំពង់ uPVC — ចុងដោត",
        "caption_km": (
            "ទំហំទីផ្សារ / ទំហំ UPG / អង្កត់ផ្ចិតខាងក្រៅ D / អង្កត់ផ្ចិតដោត Dr / ជម្រៅដោត L។ "
            "ភាពអត់ធ្មត់ដូចដែលបានបោះពុម្ពក្នុងកាតាឡុកឆ្នាំ 2026។"
        ),
        "blurb": (
            "The backbone of the range. Unplasticised PVC for cold water supply, drainage and "
            "irrigation — light to handle, solvent-cement jointed, and completely non-toxic so it "
            "is safe on potable water. Corrosion cannot touch it and scale does not build up inside "
            "the bore, so flow stays where the designer put it."
        ),
        "tags": ["Cold water supply", "Drainage", "Irrigation", "Fire sprinkler", "Chemical transfer"],
        "specTitle": "uPVC pipe dimensions — socket end",
        "caption": (
            "Market size / UPG size / outside diameter D / socket bore Dr / socket depth L. "
            "Tolerances as published in the 2026 catalogue."
        ),
        "cols": ["Market size (mm)", "UPG (mm)", "Inch", "D (mm)", "Dr (mm)", "Socket L min–max (mm)"],
        "rows": [
            ["21", "22", '1/2"', "22.4 ± 0.2", "21.4 ± 0.3", "30 – 35"],
            ["27", "26", '3/4"', "26.4 ± 0.2", "25.3 ± 0.3", "35 – 40"],
            ["34", "34", '1"', "34.6 ± 0.2", "33.3 ± 0.3", "41 – 46"],
            ["42", "42", '1 1/4"', "42.6 ± 0.2", "41.2 ± 0.3", "46 – 51"],
            ["49", "48", '1 1/2"', "48.7 ± 0.3", "47.2 ± 0.4", "55 – 60"],
            ["60", "60", '2"', "60.8 ± 0.3", "59.0 ± 0.4", "63 – 68"],
            ["75", "76", '2 1/2"', "76.6 ± 0.3", "75.2 ± 0.4", "63 – 68"],
            ["90", "89", '3"', "89.6 ± 0.3", "88.2 ± 0.4", "64 – 69"],
            ["100", "114", '4"', "114.7 ± 0.4", "113.2 ± 0.4", "84 – 103"],
            ["125", "140", '5"', "140.8 ± 0.4", "139.0 ± 0.4", "104 – 109"],
            ["165", "165", '6"', "166.0 ± 0.4", "163.9 ± 0.4", "132 – 137"],
            ["200", "216", '8"', "217.9 ± 0.8", "213.8 ± 0.9", "200 – 210"],
            ["250", "267", '10"', "269.3 ± 0.9", "264.2 ± 1.0", "250 – 260"],
            ["300", "318", '12"', "320.7 ± 1.0", "314.6 ± 1.1", "300 – 310"],
        ],
    },
    {
        "id": "ppr",
        "name": "PPR pipe — hot & cold",
        "brands": ["Eagle"],
        "color": "var(--c-ppr)",
        "meta": "Polypropylene random copolymer · 20–110 mm",
        "legend": "EAGLE PPR PIPE ISO 9001:2015 · PRODUCT OF CAMBODIA",
        "name_km": "បំពង់ PPR — ក្តៅ និងត្រជាក់",
        "meta_km": "Polypropylene random copolymer · 20–110 ម.ម",
        "blurb_km": (
            "PPR ពណ៌បៃតង សម្រាប់ទឹកក្តៅ និងត្រជាក់ក្នុងអាគារ។ ការភ្ជាប់ដោយកម្តៅ "
            "ធ្វើឱ្យសន្លាក់ក្លាយជាផ្នែកមួយនៃបំពង់ ជំនួសឱ្យចំណុចខ្សោយ — គ្មានខ្សែស្រឡាយ "
            "គ្មានសារធាតុរំលាយ គ្មានអ្វីលេចធ្លាយនៅគ្រឿងបន្លាស់។ គ្មានជាតិពុល ចរន្តកម្តៅទាប "
            "និងស្ងាត់ពេលមានលំហូរ ដែលជាមូលហេតុដែលវាប្រើក្នុងសណ្ឋាគារ មន្ទីរពេទ្យ និងអាគារផ្ទះល្វែង។"
        ),
        "tags_km": ["ទឹកក្តៅ", "ទឹកត្រជាក់", "ការភ្ជាប់ដោយកម្តៅ", "ទឹកស្អាត", "សំឡេងទាប"],
        "specTitle_km": "ស៊េរីបំពង់ PPR",
        "caption_km": "S3.2 សម្រាប់ប្រព័ន្ធទឹកក្តៅ S5 សម្រាប់ទឹកត្រជាក់។ ទំហំស្តង់ដាររួមគ្នាសម្រាប់ស៊េរីទាំងពីរ។",
        "blurb": (
            "Green PPR for hot and cold water inside buildings. Heat-fusion welded, so the joint "
            "becomes part of the pipe instead of a weak point — no threads, no solvent, nothing to "
            "leak at the fitting. Non-toxic, low thermal conductivity and quiet under flow, which "
            "is why it goes into hotels, hospitals and apartments."
        ),
        "tags": ["Hot water", "Cold water", "Heat fusion", "Potable", "Low noise"],
        "specTitle": "PPR pipe series",
        "caption": "S3.2 for hot water systems, S5 for cold water. Nominal sizes shared across both series.",
        "cols": ["Series", "Working pressure", "Nominal sizes (mm)", "Typical use"],
        "rows": [
            ["S3.2", "2.0 MPa", "20 · 25 · 32 · 40 · 50 · 63 · 75 · 90 · 110", "Hot water supply system"],
            ["S5", "1.25 MPa", "20 · 25 · 32 · 40 · 50 · 63 · 75 · 90 · 110", "Cold water supply system"],
        ],
    },
    {
        "id": "hdpe",
        "name": "HDPE pipe",
        "brands": ["Eagle", "Smart"],
        "color": "var(--c-hdpe)",
        "stripe": "#FFD100",
        "meta": "PE100 raw material · OD 20–400 mm · PN6–PN20",
        "legend": "EAGLE HDPE PIPE ISO 9001:2015 · PRODUCT OF CAMBODIA",
        "name_km": "បំពង់ HDPE",
        "meta_km": "វត្ថុធាតុ PE100 · OD 20–400 ម.ម · PN6–PN20",
        "blurb_km": (
            "ប៉ូលីអេទីលីនខ្មៅដែលអាចរមៀលបាន សម្រាប់ផ្គត់ផ្គង់ទឹកសាធារណៈ និងប្រព័ន្ធលូ "
            "និងសម្រាប់បំពង់ដឹកខ្សែទូរគមនាគមន៍ អគ្គិសនី និងហ្គាស។ ការភ្ជាប់ butt fusion និង "
            "electrofusion រឹងមាំជាងបំពង់ខ្លួនឯង ដូច្នេះបំពង់ក្រោមដីគ្មានផ្លូវលេចធ្លាយទេ — "
            "ហើយសម្ភារៈរឹងល្មមអាចទ្រាំនឹងការរសាយដី និងបន្ទុកចរាចរណ៍ដោយមិនប្រេះ។"
        ),
        "tags_km": ["បំពង់មេទឹក", "បំពង់ដឹកខ្សែទូរគមនាគមន៍", "បំពង់ដឹកខ្សែអគ្គិសនី", "បំពង់ហ្គាស", "Butt fusion"],
        "specTitle_km": "អង្កត់ផ្ចិតខាងក្រៅ HDPE និងថ្នាក់សម្ពាធ",
        "caption_km": (
            "កម្រាស់ជញ្ជាំងតាមស៊េរី SDR សម្រាប់ PN ដែលបានជ្រើសរើស។ សួរក្រុមលក់សម្រាប់ "
            "តារាងកម្រាស់ពេញលេញនៃទំហំ និងថ្នាក់របស់អ្នក។"
        ),
        "blurb": (
            "Coiled black polyethylene for municipal water supply and drainage, and for "
            "telecommunication, electricity and gas conduit. Butt-fusion and electrofusion joints "
            "are stronger than the pipe itself, so a buried line has no leak path — and the material "
            "is tough enough to take ground movement and traffic loading without cracking."
        ),
        "tags": ["Water mains", "Telecom duct", "Electrical duct", "Gas conduit", "Butt fusion"],
        "specTitle": "HDPE outside diameters & pressure classes",
        "caption": (
            "Wall thickness follows the SDR series for the selected PN. Ask sales for the full "
            "wall-thickness table for your size and class."
        ),
        "cols": ["Outside diameter (mm)", "Pressure classes", "Material"],
        "rows": [
            ["20 · 25 · 32 · 40 · 50 · 63", "PN6 – PN20", "PE100"],
            ["75 · 90 · 110 · 125 · 140 · 160", "PN6 – PN20", "PE100"],
            ["180 · 200 · 225 · 250 · 280", "PN6 – PN20", "PE100"],
            ["315 · 355 · 400", "PN6 – PN20", "PE100"],
        ],
    },
    {
        "id": "conduit",
        "name": "uPVC electrical conduit",
        "brands": ["Eagle"],
        "color": "var(--c-conduit)",
        "light": True,
        "meta": '3/8"–1" · rigid cable conduit',
        "legend": "EAGLE ELECTRICAL CONDUIT ISO 9001:2015 · PRODUCT OF CAMBODIA",
        "name_km": "បំពង់ដឹកខ្សែអគ្គិសនី uPVC",
        "meta_km": '3/8"–1" · បំពង់ដឹកខ្សែរឹង',
        "blurb_km": (
            "បំពង់រឹងការពារខ្សែពីផលប៉ះពាល់ សំណើម និងសត្វកកេរ ខណៈដែលវាអ៊ីសូឡង់ "
            "ជាជាងដឹកចរន្ត។ វាពន្លត់ខ្លួនឯង មិនច្រេះក្នុងជញ្ជាំង ហើយដកខ្សែងាយព្រោះខាងក្នុង "
            "រលោង — អគ្គិសនីអាចប្តូរខ្សែឡើងវិញបានរាប់ឆ្នាំក្រោយ ដោយមិនចាំបាច់បើកបាយអ។"
        ),
        "tags_km": ["ខ្សែលាក់", "តម្លើងលើផ្ទៃ", "ពន្លត់ខ្លួនឯង", "មិនច្រេះ"],
        "specTitle_km": "ទំហំបំពង់ដឹកខ្សែ Eagle",
        "caption_km": "អង្កត់ផ្ចិតខាងក្រៅបំពង់រឹងតាមទំហំទីផ្សារ។",
        "blurb": (
            "Rigid conduit that protects cable from impact, damp and rodents while insulating rather "
            "than conducting. It is self-extinguishing, does not corrode in a wall chase, and pulls "
            "easily because the bore is smooth — an electrician can rewire the same run years later "
            "without opening the plaster."
        ),
        "tags": ["Concealed wiring", "Surface mount", "Self-extinguishing", "Corrosion free"],
        "specTitle": "Eagle cable conduit dimensions",
        "caption": "Rigid conduit outside diameter by market size.",
        "cols": ["Market size (mm)", "Inch", "Outside diameter (mm)"],
        "rows": [
            ["16", '3/8"', "15.80"],
            ["20", '1/2"', "19.95"],
            ["25", '3/4"', "24.95"],
            ["32", '1"', "31.78"],
        ],
    },
    {
        "id": "corrugated",
        "name": "Corrugated flexible conduit",
        "brands": ["Eagle"],
        "color": "#E9EEF4",
        "light": True,
        "meta": "Flexible · 16–32 mm · voids & slabs",
        "legend": "EAGLE CORRUGATED CONDUIT ISO 9001:2015",
        "name_km": "បំពង់ដឹកខ្សែដែលអាចបត់បាន",
        "meta_km": "អាចបត់បាន · 16–32 ម.ម · ចន្លោះស្នាម និងកម្រាល",
        "blurb_km": (
            "បំពង់ដឹកខ្សែដែលអាចបត់បាន សម្រាប់ខ្សែលាក់ដែលអាចទាញដកបានឡើងវិញ ក្នុង "
            "កម្រាល ពិដាន និងចន្លោះជញ្ជាំង។ វាបត់តាមរចនាសម្ព័ន្ធដោយមិនត្រូវការគ្រឿងបន្លាស់ "
            "អាចទ្រាំកម្តៅពី -5°C ដល់ 60°C ហើយអនុញ្ញាតឱ្យអ្នកប្តូរសៀគ្វីនៅពេលក្រោយ ដោយមិនបាក់បេតុង។"
        ),
        "tags_km": ["ចន្លោះកម្រាល និងពិដាន", "ទាញដកបានឡើងវិញ", "-5°C ដល់ 60°C", "ធន់នឹងផលប៉ះពាល់"],
        "specTitle_km": "ទំហំបំពង់ដែលអាចបត់បាន",
        "caption_km": "អង្កត់ផ្ចិតខាងក្រៅបំពង់ corrugated តាមទំហំទីផ្សារ។",
        "blurb": (
            "Flexible corrugated conduit for hidden, re-pullable wiring inside slabs, ceilings and "
            "wall voids. It bends around structure without fittings, takes temperatures from -5 °C "
            "to 60 °C, and lets you change a circuit later without breaking concrete."
        ),
        "tags": ["Slab & ceiling voids", "Re-pullable", "-5 °C to 60 °C", "Impact resistant"],
        "specTitle": "Flexible conduit dimensions",
        "caption": "Corrugated conduit outside diameter by market size.",
        "cols": ["Market size (mm)", "Outside diameter (mm)"],
        "rows": [["16", "18"], ["20", "22"], ["25", "26"], ["32", "33"]],
    },
    {
        "id": "trunking",
        "name": "uPVC trunking",
        "brands": ["Eagle"],
        "color": "#F3F6FA",
        "light": True,
        "meta": "Surface cable management with snap-on lid",
        "legend": "EAGLE uPVC TRUNKING · PRODUCT OF CAMBODIA",
        "name_km": "ថាសខ្សែ uPVC",
        "meta_km": "គ្រប់គ្រងខ្សែលើផ្ទៃ ជាមួយគំរបខ្ទាស់",
        "blurb_km": (
            "ថាសខ្សែលើផ្ទៃ សម្រាប់ការិយាល័យ ហាង និងការជួសជុល ដែលការឈូសជញ្ជាំងមិនអាច "
            "ធ្វើបាន។ គំរបខ្ទាស់រក្សាខ្សែរៀបរយស្អាត និងអាចចូលបាន តួអ៊ីសូឡង់ ហើយ uPVC "
            "ធន់នឹងការរីករាលដាលអណ្តាតភ្លើង និងកាំរស្មីយូវី — ដូច្នេះវានៅស ជាជាងលឿងតាមជញ្ជាំងដែលមានពន្លឺថ្ងៃ។"
        ),
        "tags_km": ["តម្លើងលើផ្ទៃ", "គំរបខ្ទាស់", "ធន់នឹងភ្លើង", "ស្ថេរភាពយូវី"],
        "specTitle_km": "ថាសខ្សែ",
        "caption_km": (
            "ផលិតក្នុងទទឹង និងកម្ពស់ច្រើន រួមទាំង 40 ម.ម × 20 ម.ម។ សួរក្រុមលក់សម្រាប់ "
            "បញ្ជីទំហំ និងគ្រឿងបន្លាស់គំរបបច្ចុប្បន្ន។"
        ),
        "blurb": (
            "Surface trunking for offices, shops and renovations where chasing the wall is not an "
            "option. The snap-on lid keeps cable tidy and accessible, the body insulates, and the "
            "uPVC resists flame propagation and UV — so it stays white instead of yellowing along a "
            "sunlit wall."
        ),
        "tags": ["Surface mount", "Snap-on lid", "Flame retardant", "UV stable"],
        "specTitle": "Trunking",
        "caption": (
            "Multiple widths and heights are produced, including 40 mm × 20 mm. Ask sales for the "
            "current size list and lid accessories."
        ),
        "cols": ["Product", "Sizes", "Finish"],
        "rows": [["uPVC trunking with lid", "Several widths incl. 40 mm × 20 mm", "White"]],
    },
    {
        "id": "fittings",
        "name": "uPVC pipe fittings",
        "brands": ["Eagle", "Lion Head", "Smart"],
        "color": "var(--c-upvc)",
        "meta": "Class 13.5 (21–165 mm) & class 8.5 (60–165 mm)",
        "legend": "EAGLE uPVC FITTINGS ISO 9001:2015 · PRODUCT OF CAMBODIA",
        "name_km": "គ្រឿងបន្លាស់បំពង់ uPVC",
        "meta_km": "ថ្នាក់ 13.5 (21–165 ម.ម) និងថ្នាក់ 8.5 (60–165 ម.ម)",
        "blurb_km": (
            "គ្រឿងបន្លាស់ចាក់ផ្សិតតាមតារាងដូចគ្នានឹងបំពង់ ដូច្នេះជម្រៅដោត និងការរួមចង្អៀត "
            "ត្រូវគ្នានឹងអ្វីដែលអ្នកកំពុងស្អិត។ កេតាត កែង គូបលីង រេឌុសឺរ ឆ្នុក គម្រប និង "
            "ក្លីប ទាំងថ្នាក់ជញ្ជាំងពីរ។"
        ),
        "tags_km": ["កេតាត", "កែង 90° និង 45°", "គូបលីង", "រេឌុសឺរ", "ឆ្នុក និងគម្រប", "ក្លីប"],
        "specTitle_km": "ថ្នាក់គ្រឿងបន្លាស់",
        "caption_km": "គំនូសពេញលេញសម្រាប់គ្រឿងបន្លាស់នីមួយៗមានក្នុងកាតាឡុកបោះពុម្ព។",
        "blurb": (
            "Injection-moulded fittings dimensioned to the same tables as the pipe, so socket depth "
            "and taper actually match what you are gluing them to. Tees, elbows, couplings, "
            "reducers, plugs, caps and clamps across both wall classes."
        ),
        "tags": ["Tees", "Elbows 90° & 45°", "Couplings", "Reducers", "Plugs & caps", "Clamps"],
        "specTitle": "Fitting classes",
        "caption": "Full dimension drawings for every fitting are in the printed catalogue.",
        "cols": ["Class", "Size range", "Includes"],
        "rows": [
            ["13.5", '21 – 165 mm (1/2" – 6")',
             "Tees, 90°/45° elbows, female & male elbows, couplings, reducers, male plugs, end caps, clamps"],
            ["8.5", '60 – 165 mm (2" – 6")',
             "Drainage tees, swept tees, 45° elbows, reducing bushes, waste traps"],
        ],
    },
    {
        "id": "condfit",
        "name": "Conduit fittings & boxes",
        "brands": ["Eagle"],
        "color": "#EDF1F6",
        "light": True,
        "meta": "16–32 mm accessories for the conduit range",
        "legend": "EAGLE CONDUIT FITTINGS ISO 9001:2015",
        "name_km": "គ្រឿងបន្លាស់បំពង់ដឹកខ្សែ និងប្រអប់",
        "meta_km": "គ្រឿងបន្លាស់ 16–32 ម.ម សម្រាប់បំពង់ដឹកខ្សែ",
        "blurb_km": (
            "គ្រឿងបន្លាស់ដែលបញ្ចប់បំពង់ដឹកខ្សែ៖ កែង 90° ប្រអប់ប្រសព្វ ១ ដល់ ៤ ផ្លូវ "
            "ប្រអប់គម្រប ឧបករណ៍ភ្ជាប់ និង U-clips — ទំហំដូចគ្នានឹងបំពង់ 16, 20, 25 និង "
            "32 ម.ម ដូច្នេះមិនចាំបាច់ដាក់កែងបន្ថែមនៅលើទីតាំងទេ។"
        ),
        "tags_km": ["កែង 90°", "ប្រអប់ប្រសព្វ", "ប្រអប់គម្រប", "ឧបករណ៍ភ្ជាប់", "U-clips"],
        "specTitle_km": "ទំហំគ្រឿងបន្លាស់បំពង់ដឹកខ្សែ",
        "caption_km": "អង្កត់ផ្ចិតខាងក្រៅប្រអប់ប្រសព្វ D និងកម្ពស់ H2 តាមទំហំបំពង់ដឹកខ្សែ។",
        "blurb": (
            "The accessories that finish a conduit run: 90° elbows, one-way to four-way junction "
            "boxes, cover boxes, connectors and U-clips — all sized to the same 16, 20, 25 and "
            "32 mm conduit so nothing needs shimming on site."
        ),
        "tags": ["90° elbows", "Junction boxes", "Cover boxes", "Connectors", "U-clips"],
        "specTitle": "Conduit accessory sizes",
        "caption": "Junction box outside diameter D and height H2 by conduit size.",
        "cols": ["Conduit size (mm)", "Inch", "Box D (mm)", "Box H2 (mm)"],
        "rows": [
            ["16", '3/8"', "19", "50.0"],
            ["20", '1/2"', "23", "51.5"],
            ["25", '3/4"', "28", "54.5"],
            ["32", '1"', "36", "66.5"],
        ],
    },
]

# ------------------------------------------------------------------
# Fittings
# ------------------------------------------------------------------
FITTINGS = [
    {"n": "Equal tee", "n_km": "កេតាតស្មើ", "s": "21–165 mm", "p": "M4 6h16M12 6v12"},
    {"n": "Reducing tee", "n_km": "កេតាតរេឌុស", "s": "27×21 – 165×125", "p": "M4 6h16M12 6v12"},
    {"n": "90° elbow", "n_km": "កែង 90°", "s": "21–165 mm", "p": "M6 4v9a5 5 0 0 0 5 5h7"},
    {"n": "45° elbow", "n_km": "កែង 45°", "s": "21–165 mm", "p": "M5 5v6l9 9h5"},
    {"n": "Female elbow", "n_km": "កែងស្រី", "s": "21–165 mm", "p": "M6 4v9a5 5 0 0 0 5 5h7"},
    {"n": "Male elbow", "n_km": "កែងប្រុស", "s": "21–165 mm", "p": "M6 4v9a5 5 0 0 0 5 5h7"},
    {"n": "Coupling", "n_km": "គូបលីង", "s": "21–100 mm", "p": "M3 12h18M8 8v8M16 8v8"},
    {"n": "Reducing socket", "n_km": "ដោតរេឌុស", "s": "27×21 – 165×140", "p": "M3 12h18M9 8v8M15 10v4"},
    {"n": "Male plug", "n_km": "ឆ្នុកប្រុស", "s": "21–100 mm", "p": "M4 12h10M14 8v8"},
    {"n": "End cap", "n_km": "គម្របចុង", "s": "21–100 mm", "p": "M4 12h12M16 7v10"},
    {"n": "Pipe clamp", "n_km": "ក្លីបបំពង់", "s": "21 · 27 · 60 mm", "p": "M6 12a6 6 0 1 1 12 0M4 18h16"},
    {"n": "Junction box", "n_km": "ប្រអប់ប្រសព្វ", "s": "16–32 mm", "p": "M5 5h14v14H5zM12 5v14M5 12h14"},
]

# ------------------------------------------------------------------
# Events
# ------------------------------------------------------------------
EVENTS = [
    {"id": "iso-audit-2026", "y": "2026", "m": "JUN", "kind": "Quality", "c": "var(--blue)",
     "t": "ISO 9001:2015 surveillance audit passed",
     "t_km": "ឆ្លងកាត់សវនកម្មត្រួតពិនិត្យ ISO 9001:2015",
     "d": "Auditors walked the extrusion and injection lines, sampled batch records and closed the visit with no major findings. Certificate remains valid to March 2027.",
     "d_km": "សវនករបានដើរលើខ្សែពន្លាត និងចាក់ផ្សិត យកគំរូកំណត់ត្រាបាច់ ហើយបិទការទស្សនាដោយគ្មានការរកឃើញធំដុំ។ វិញ្ញាបនបត្រនៅមានសុពលភាពរហូតដល់ខែមីនា ឆ្នាំ 2027។",
     "loc": "Prek Phnov factory, Phnom Penh", "loc_km": "រោងចក្រព្រែកភ្នៅ ភ្នំពេញ",
     "dur": "2 days", "dur_km": "២ ថ្ងៃ",
     "team": "QA / QC & production teams", "team_km": "ក្រុម QA/QC និងផលិតកម្ម",
     "detail": "The two-day surveillance audit covered the full manufacturing flow — compound handling, extrusion and injection moulding, in-process inspection, and the final inspection and test area. Our QA team walked through every control point with the auditors, shared the 2025 non-conformance register, and showed how each corrective action was closed out.",
     "detail_km": "សវនកម្មត្រួតពិនិត្យរយៈពេលពីរថ្ងៃបានគ្របដណ្តប់លំហូរផលិតកម្មទាំងមូល — ការគ្រប់គ្រងវត្ថុធាតុ ការពន្លាត និងចាក់ផ្សិត ការត្រួតពិនិត្យពេលផលិត និងតំបន់ត្រួតពិនិត្យ និងសាកល្បងចុងក្រោយ។ ក្រុម QA របស់យើងបានដើរពិនិត្យគ្រប់ចំណុចត្រួតពិនិត្យជាមួយសវនករ ចែករំលែកបញ្ជីគម្លាតឆ្នាំ 2025 និងបង្ហាញពីរបៀបបិទសកម្មភាពកែតម្រូវនីមួយៗ។",
     "outcome": "Surveillance passed with no major findings. The ISO 9001:2015 certificate remains valid to March 2027.",
     "outcome_km": "សវនកម្មត្រួតពិនិត្យបានឆ្លងដោយគ្មានការរកឃើញធំដុំ។ វិញ្ញាបនបត្រ ISO 9001:2015 នៅមានសុពលភាពរហូតដល់ខែមីនា ឆ្នាំ 2027។",
     "highlights": ["Extrusion and injection lines walked line-by-line", "Batch records sampled across 12 product families", "No major findings — certificate valid to March 2027"],
     "highlights_km": ["ដើរពិនិត្យខ្សែពន្លាត និងចាក់ផ្សិតគ្រប់បន្ទាត់", "យកគំរូកំណត់ត្រាបាច់លើគ្រួសារផលិតផលចំនួន 12", "គ្មានការរកឃើញធំដុំ — វិញ្ញាបនបត្រមានសុពលភាពរហូតដល់ខែមីនា 2027"]},
    {"id": "consultant-tour", "y": "2026", "m": "MAY", "kind": "Customers", "c": "var(--c-ppr)",
     "t": "Consultant group tours the Prek Phnov plant",
     "t_km": "ក្រុមអ្នកប្រឹក្សា MEP ទស្សនារោងចក្រព្រែកភ្នៅ",
     "d": "A group of MEP consultants ran their own wall-thickness checks on the bench and watched a hydrostatic pressure test from start to finish.",
     "d_km": "ក្រុមអ្នកប្រឹក្សា MEP បានធ្វើការត្រួតពិនិត្យកម្រាស់ជញ្ជាំងដោយខ្លួនឯងនៅលើតុសាកល្បង ហើយបានមើលការធ្វើតេស្តសម្ពាធសន្ទនីយស្តាទិចពីដើមដល់ចប់។",
     "loc": "Prek Phnov factory, Phnom Penh", "loc_km": "រោងចក្រព្រែកភ្នៅ ភ្នំពេញ",
     "dur": "Half day", "dur_km": "កន្លះថ្ងៃ",
     "team": "MEP consultants & technical sales", "team_km": "អ្នកប្រឹក្សា MEP និងក្រុមលក់បច្ចេកទេស",
     "detail": "Ten MEP consultants from five design firms spent the morning in the factory. After the safety induction they visited the compounding and extrusion halls, then ran their own micrometer checks on freshly drawn samples before watching a full hydrostatic pressure test to 1.5× working pressure.",
     "detail_km": "អ្នកប្រឹក្សា MEP ចំនួន ១០ នាក់មកពីក្រុមហ៊ុនរចនាចំនួន ៥ បានចំណាយពេលព្រឹកមួយនៅក្នុងរោងចក្រ។ បន្ទាប់ពីការណែនាំសុវត្ថិភាព ពួកគេបានទស្សនាសាលលាយវត្ថុធាតុ និងពន្លាត បន្ទាប់មកធ្វើការវាស់ដោយមីក្រូម៉ែត្រលើគំរូដែលទើបផលិតថ្មី មុនពេលទស្សនាការធ្វើតេស្តសម្ពាធសន្ទនីយស្តាទិចពេញលេញដល់ ១.៥ ដងនៃសម្ពាធការងារ។",
     "outcome": "Consultants took sample spools back to their offices, and three firms requested technical data packs for upcoming designs.",
     "outcome_km": "អ្នកប្រឹក្សាបានយកគំរូបំពង់ត្រឡប់ទៅការិយាល័យវិញ ហើយក្រុមហ៊ុនចំនួន ៣ បានស្នើសុំកញ្ចប់ទិន្នន័យបច្ចេកទេសសម្រាប់ការរចនានាពេលខាងមុខ។",
     "highlights": ["Hands-on wall-thickness checks on the test bench", "Live hydrostatic pressure test from start to finish", "Jointing Q&A on PE and PPR"],
     "highlights_km": ["ត្រួតពិនិត្យកម្រាស់ជញ្ជាំងដោយដៃផ្ទាល់នៅលើតុសាកល្បង", "មើលការធ្វើតេស្តសម្ពាធសន្ទនីយស្តាទិចពីដើមដល់ចប់", "សំណួរចម្លើយស្តីពីការភ្ជាប់ PE និង PPR"]},
    {"id": "mould-supplier-guangdong", "y": "2026", "m": "APR", "kind": "Supply chain", "c": "var(--ink-2)",
     "t": "Mould supplier visit, Guangdong",
     "t_km": "ទស្សនាអ្នកផ្គត់ផ្គង់ផ្សិត ក្វាងទុង",
     "d": "Our technical team reviewed new fitting mould tooling and injection cycles ahead of expanding the class 8.5 fitting range.",
     "d_km": "ក្រុមបច្ចេកទេសរបស់យើងបានពិនិត្យឧបករណ៍ផ្សិតថ្មី និងវដ្តចាក់ មុនពេលពង្រីកជួរគ្រឿងបន្លាស់ថ្នាក់ 8.5។",
     "loc": "Guangdong, China", "loc_km": "ក្វាងទុង ចិន",
     "dur": "3 days", "dur_km": "៣ ថ្ងៃ",
     "team": "Technical & moulding team", "team_km": "ក្រុមបច្ចេកទេស និងផ្សិត",
     "detail": "Over three days the technical and moulding team reviewed the CAD models and steel of new fitting moulds, ran trial injection cycles on the supplier's machines, and compared shrinkage behaviour against our existing tooling. Cycle-time data was captured for the new class 8.5 socket and reducer family.",
     "detail_km": "ក្នុងរយៈពេល ៣ ថ្ងៃ ក្រុមបច្ចេកទេស និងផ្សិតបានពិនិត្យគំរូ CAD និងដែកនៃផ្សិតគ្រឿងបន្លាស់ថ្មី រត់សាកល្បងវដ្តចាក់លើម៉ាស៊ីនរបស់អ្នកផ្គត់ផ្គង់ និងប្រៀបធៀបឥរិយាបថបង្រួមជាមួយឧបករណ៍ដែលមានស្រាប់។ ទិន្នន័យពេលវដ្តត្រូវបានកត់ត្រាសម្រាប់ក្រុមគ្រឿងបន្លាស់ថ្នាក់ 8.5 ថ្មី។",
     "outcome": "Final tooling order confirmed with a revised delivery plan for the class 8.5 range expansion.",
     "outcome_km": "ការបញ្ជាទិញឧបករណ៍ផ្សិតចុងក្រោយត្រូវបានបញ្ជាក់ជាមួយផែនការដឹកជញ្ជូនដែលបានកែសម្រួលសម្រាប់ការពង្រីកជួរថ្នាក់ 8.5។",
     "highlights": ["New fitting mould tooling reviewed in detail", "Injection cycle settings optimised", "Roadmap set for the class 8.5 range expansion"],
     "highlights_km": ["ពិនិត្យឧបករណ៍ផ្សិតថ្មីយ៉ាងលម្អិត", "កែសម្រួលវដ្តចាក់ឱ្យល្អប្រសើរ", "កំណត់ផែនការពង្រីកជួរថ្នាក់ 8.5"]},
    {"id": "hdpe-mains-upgrade", "y": "2026", "m": "MAR", "kind": "Customers", "c": "var(--c-upvc)",
     "t": "HDPE supplied to a Phnom Penh mains upgrade",
     "t_km": "ផ្គត់ផ្គង់ HDPE សម្រាប់ការដំឡើងបំពង់មេទឹកភ្នំពេញ",
     "d": "PE100 pipe delivered in coil and straight length for a district water supply upgrade, with butt-fusion guidance for the contractor on site.",
     "d_km": "បំពង់ PE100 ត្រូវបានដឹកជញ្ជូនជារង្វង់ និងជាដុំសម្រាប់ការដំឡើងបំពង់មេស្រុក ជាមួយការណែនាំ butt fusion សម្រាប់អ្នកម៉ៅការនៅនឹងកន្លែង។",
     "loc": "Phnom Penh, Cambodia", "loc_km": "ភ្នំពេញ កម្ពុជា",
     "dur": "4-week supply window", "dur_km": "រយៈពេលផ្គត់ផ្គង់ ៤ សប្តាហ៍",
     "team": "HDPE sales & site support", "team_km": "ក្រុមលក់ HDPE និងគាំទ្រទីតាំង",
     "detail": "PE100 pipe in PN10 and PN16 was supplied in coil for trench laying and in straight lengths where alignment required it. Site support covered butt-fusion jointing with a calibrated machine, acceptable joint-time tables, and pre-commissioning pressure testing at the district reservoir.",
     "detail_km": "បំពង់ PE100 ថ្នាក់ PN10 និង PN16 ត្រូវបានផ្គត់ផ្គង់ជារង្វង់សម្រាប់ដាក់ក្នុងលេណដ្ឋាន និងជាដុំត្រង់កន្លែងដែលត្រូវការ។ ការគាំទ្រទីតាំងបានគ្របដណ្តប់ការភ្ជាប់ butt fusion ជាមួយម៉ាស៊ីនដែលបានក្រិតត្រឹមត្រូវ តារាងពេលភ្ជាប់ដែលអាចទទួលយកបាន និងការធ្វើតេស្តសម្ពាធមុនដាក់ដំណើរការនៅអាងស្តុកទឹកស្រុក។",
     "outcome": "The 4-week supply window was met and the section was pressure-tested and handed over without rework.",
     "outcome_km": "រយៈពេលផ្គត់ផ្គង់ ៤ សប្តាហ៍ត្រូវបានបំពេញ ហើយផ្នែកនោះត្រូវបានធ្វើតេស្តសម្ពាធ និងប្រគល់ដោយគ្មានការងារកែឡើងវិញ។",
     "highlights": ["PE100 delivered in coil and straight length", "Butt-fusion guidance for the contractor on site", "Jointing QC supported at commissioning"],
     "highlights_km": ["ដឹកជញ្ជូន PE100 ជារង្វង់ និងជាដុំ", "ណែនាំ butt fusion ដល់អ្នកម៉ៅការនៅនឹងកន្លែង", "គាំទ្រ QC ការភ្ជាប់នៅពេលដាក់ដំណើរការ"]},
    {"id": "plumbing-training", "y": "2026", "m": "FEB", "kind": "Community", "c": "var(--yellow-deep)",
     "t": "Technical training for plumbing students",
     "t_km": "ការបណ្តុះបណ្តាលបច្ចេកទេសសម្រាប់និស្សិតជាងទឹក",
     "d": "A half-day session on PPR heat fusion and solvent cement jointing for vocational trainees, run at the factory training bay.",
     "d_km": "វគ្គពាក់កណ្តាលថ្ងៃស្តីពីការភ្ជាប់កម្តៅ PPR និងការភ្ជាប់កាវសូលវ៉េន សម្រាប់សិក្ខាកាមវិជ្ជាជីវៈ នៅកន្លែងបណ្តុះបណ្តាលរោងចក្រ។",
     "loc": "Factory training bay, Prek Phnov", "loc_km": "កន្លែងបណ្តុះបណ្តាលរោងចក្រ ព្រែកភ្នៅ",
     "dur": "Half day", "dur_km": "កន្លះថ្ងៃ",
     "team": "Technical trainers", "team_km": "គ្រូបង្វឹកបច្ចេកទេស",
     "detail": "Forty vocational trainees split into groups for two stations: PPR heat-fusion with a socket welder, and solvent-cement jointing of uPVC. Each trainee completed at least one joint at each station and the session closed with a short assessment.",
     "detail_km": "សិក្ខាកាមវិជ្ជាជីវៈចំនួន ៤០ នាក់បានបែងចែកជាក្រុមសម្រាប់ស្ថានីយពីរ៖ ការភ្ជាប់កម្តៅ PPR ជាមួយម៉ាស៊ីន socket welder និងការភ្ជាប់កាវសូលវ៉េននៃ uPVC។ សិក្ខាកាមម្នាក់ៗបានបញ្ចប់ការភ្ជាប់យ៉ាងតិចមួយនៅស្ថានីយនីមួយៗ ហើយវគ្គបានបញ្ចប់ដោយការវាយតម្លៃខ្លីមួយ។",
     "outcome": "All trainees who completed the two stations received a completion certificate; the school has booked a second session.",
     "outcome_km": "សិក្ខាកាមទាំងអស់ដែលបានបញ្ចប់ស្ថានីយទាំងពីរបានទទួលវិញ្ញាបនបត្របញ្ចប់វគ្គ ហើយសាលាបានកក់វគ្គទីពីររួចហើយ។",
     "highlights": ["PPR heat-fusion hands-on practice", "Solvent cement jointing practice", "Completion certificates for trainees"],
     "highlights_km": ["អនុវត្តការភ្ជាប់កម្តៅ PPR ដោយដៃ", "អនុវត្តការភ្ជាប់កាវសូលវ៉េន", "វិញ្ញាបនបត្របញ្ចប់វគ្គសម្រាប់សិក្ខាកាម"]},
    {"id": "pressure-test-bath", "y": "2025", "m": "DEC", "kind": "Quality", "c": "var(--red)",
     "t": "New pressure test bath commissioned",
     "t_km": "ដាក់ឱ្យដំណើរការអាងសាកល្បងសម្ពាធថ្មី",
     "d": "Additional capacity in the lab means longer-duration hydrostatic testing can run in parallel with daily production QC.",
     "d_km": "សមត្ថភាពបន្ថែមក្នុងមន្ទីរពិសោធន៍ មានន័យថាការធ្វើតេស្តសម្ពាធសន្ទនីយស្តាទិចរយៈពេលវែងអាចដំណើរការស្របគ្នាជាមួយ QC ផលិតកម្មប្រចាំថ្ងៃ។",
     "loc": "Lab, Prek Phnov factory", "loc_km": "មន្ទីរពិសោធន៍ រោងចក្រព្រែកភ្នៅ",
     "dur": "3-week commissioning", "dur_km": "ដាក់ឱ្យដំណើរការរយៈពេល ៣ សប្តាហ៍",
     "team": "QA / QC laboratory", "team_km": "មន្ទីរពិសោធន៍ QA/QC",
     "detail": "The new bath adds eight independent test stations with electronic pressure control, so long-duration tests no longer compete with the daily release-testing queue. Commissioning covered calibration, water temperature stability and data logging.",
     "detail_km": "អាងថ្មីបន្ថែមស្ថានីយសាកល្បងឯករាជ្យចំនួន ៨ ជាមួយការគ្រប់គ្រងសម្ពាធអេឡិចត្រូនិក ដូច្នេះការធ្វើតេស្តរយៈពេលវែងលែងប្រជែងជួរដេកនៃការតេស្តប្រចាំថ្ងៃ។ ការដាក់ដំណើរការបានគ្របដណ្តប់ការក្រិតត្រឹមត្រូវ ស្ថេរភាពសីតុណ្ហភាពទឹក និងការកត់ត្រាទិន្នន័យ។",
     "outcome": "Lab capacity for long-duration testing roughly doubled, and product release times improved accordingly.",
     "outcome_km": "សមត្ថភាពមន្ទីរពិសោធន៍សម្រាប់ការធ្វើតេស្តរយៈពេលវែងកើនឡើងប្រហែលទ្វេដង ហើយពេលវេលាចេញផលិតផលក៏ប្រសើរឡើងតាមនោះ។",
     "highlights": ["Long-duration hydrostatic testing runs in parallel with daily QC", "Higher daily test throughput", "Faster product-release times"],
     "highlights_km": ["ធ្វើតេស្តសម្ពាធរយៈពេលវែងស្របជាមួយ QC ប្រចាំថ្ងៃ", "សមត្ថភាពតេស្តប្រចាំថ្ងៃកាន់តែខ្ពស់", "ពេលវេលាចេញផលិតផលកាន់តែលឿន"]},
    {"id": "distributor-day", "y": "2025", "m": "NOV", "kind": "Customers", "c": "var(--blue)",
     "t": "Distributor day, provincial partners",
     "t_km": "ថ្ងៃអ្នកចែកចាយ ដៃគូខេត្ត",
     "d": "Provincial distributors met the sales and technical team to review the 2026 range, brand marks and stock planning.",
     "d_km": "អ្នកចែកចាយខេត្តបានជួបក្រុមលក់ និងបច្ចេកទេស ដើម្បីពិនិត្យជួរផលិតផលឆ្នាំ 2026 ស្លាកម៉ាក និងផែនការស្តុក។",
     "loc": "Head office, Toul Kork", "loc_km": "ទីស្នាក់ការកណ្តាល ទួលគោក",
     "dur": "1 day", "dur_km": "១ ថ្ងៃ",
     "team": "Sales, technical & provincial distributors", "team_km": "ក្រុមលក់ បច្ចេកទេស និងអ្នកចែកចាយខេត្ត",
     "detail": "Provincial distributors from eleven provinces came to the head office for the 2026 range review. Sales presented the updated brand marks and price lists, technical ran a quick jointing refresher, and each distributor agreed stock targets for the coming year.",
     "detail_km": "អ្នកចែកចាយខេត្តមកពី ១១ ខេត្តបានមកទីស្នាក់ការកណ្តាលសម្រាប់ការពិនិត្យជួរផលិតផលឆ្នាំ 2026។ ក្រុមលក់បានបង្ហាញស្លាកម៉ាក និងតារាងតម្លៃដែលបានធ្វើបច្ចុប្បន្នភាព ក្រុមបច្ចេកទេសបានធ្វើការរំលឹកបច្ចេកទេសភ្ជាប់ខ្លីៗ ហើយអ្នកចែកចាយម្នាក់ៗបានឯកភាពលើគោលដៅស្តុកសម្រាប់ឆ្នាំខាងមុខ។",
     "outcome": "Stock plans aligned for 2026 and the first new-season orders were placed on the day.",
     "outcome_km": "ផែនការស្តុកត្រូវបានតម្រឹមសម្រាប់ឆ្នាំ 2026 ហើយការបញ្ជាទិញរដូវថ្មីដំបូងត្រូវបានដាក់នៅថ្ងៃនោះ។",
     "highlights": ["2026 range, brand marks and pricing reviewed", "Stock planning aligned with distributors", "New product samples on display"],
     "highlights_km": ["ពិនិត្យជួរផលិតផលឆ្នាំ 2026 ស្លាកម៉ាក និងតម្លៃ", "រៀបចំផែនការស្តុកជាមួយអ្នកចែកចាយ", "បង្ហាញគំរូផលិតផលថ្មី"]},
    {"id": "raw-material-audit", "y": "2025", "m": "SEP", "kind": "Supply chain", "c": "var(--ink-2)",
     "t": "Raw material partner audit",
     "t_km": "សវនកម្មដៃគូវត្ថុធាតុដើម",
     "d": "Resin supplier audit completed to keep incoming material within the specification our own formulations depend on.",
     "d_km": "សវនកម្មអ្នកផ្គត់ផ្គង់ជ័របានបញ្ចប់ ដើម្បីរក្សាវត្ថុធាតុចូលក្នុងបញ្ជាក់ដែលរូបមន្តរបស់យើងពឹងផ្អែក។",
     "loc": "Resin supplier facility", "loc_km": "កន្លែងអ្នកផ្គត់ផ្គង់ជ័រ",
     "dur": "2 days", "dur_km": "២ ថ្ងៃ",
     "team": "QA / QC & procurement", "team_km": "QA/QC និងលទ្ធកម្ម",
     "detail": "The two-day audit at the resin supplier's facility reviewed incoming-specification conformance, process capability for the grades we buy, and their own QC records. Samples were taken for verification testing back in our lab.",
     "detail_km": "សវនកម្មរយៈពេលពីរថ្ងៃនៅកន្លែងអ្នកផ្គត់ផ្គង់ជ័របានពិនិត្យការអនុលោមតាមបញ្ជាក់វត្ថុធាតុចូល សមត្ថភាពដំណើរការសម្រាប់ថ្នាក់ដែលយើងទិញ និងកំណត់ត្រា QC របស់ពួកគេផ្ទាល់។ គំរូត្រូវបានយកទៅធ្វើតេស្តផ្ទៀងផ្ទាត់នៅក្នុងមន្ទីរពិសោធន៍របស់យើង។",
     "outcome": "Feedstock specification confirmed against our formulations; the next scheduled audit was agreed for 2026.",
     "outcome_km": "បញ្ជាក់វត្ថុធាតុត្រូវបានផ្ទៀងផ្ទាត់ជាមួយរូបមន្តរបស់យើង ហើយសវនកម្មបន្ទាប់ត្រូវបានយល់ព្រមសម្រាប់ឆ្នាំ 2026។",
     "highlights": ["Incoming resin specification verified", "Process capability reviewed on site", "Feedstock security confirmed for formulations"],
     "highlights_km": ["ផ្ទៀងផ្ទាត់បញ្ជាក់ជ័រចូល", "ពិនិត្យសមត្ថភាពដំណើរការនៅនឹងកន្លែង", "បញ្ជាក់សុវត្ថិភាពវត្ថុធាតុសម្រាប់រូបមន្ត"]},
]

# ------------------------------------------------------------------
# Jobs
# ------------------------------------------------------------------
JOBS = [
    {
        "t": "Sales Executive — Construction Projects",
        "t_km": "បុគ្គលិកលក់ — គម្រោងសំណង់",
        "dept": "Sales & Marketing",
        "dept_km": "ផ្នែកលក់ និងទីផ្សារ",
        "loc": "Head Office",
        "loc_km": "ការិយាល័យកណ្តាល",
        "r": [
            "Build relationships with contractors, developers and hardware distributors in Phnom Penh and the provinces",
            "Prepare quotations from bills of quantity and follow orders through to delivery",
            "Report pipeline and market feedback weekly",
        ],
        "r_km": [
            "កសាងទំនាក់ទំនងជាមួយអ្នកម៉ៅការ អ្នកអភិវឌ្ឍន៍ និងអ្នកចែកចាយសម្ភារៈសំណង់នៅភ្នំពេញ និងតាមខេត្ត",
            "រៀបចំការដកស្រង់តម្លៃពីបញ្ជីបរិមាណ និងតាមដានការបញ្ជាទិញរហូតដល់ដឹកជញ្ជូន",
            "រាយការណ៍លំហូរការងារ និងមតិប្រតិកម្មទីផ្សាររាល់សប្តាហ៍",
        ],
        "q": [
            "2+ years selling construction materials, or a strong technical sales background",
            "Khmer fluent, functional English",
            "Own transport and a valid licence",
        ],
        "q_km": [
            "បទពិសោធន៍លក់សម្ភារៈសំណង់ ២ ឆ្នាំឡើង ឬផ្ទៃខាងក្រោយលក់បច្ចេកទេសរឹងមាំ",
            "ភាសាខ្មែរស្ទាត់ ភាសាអង់គ្លេសប្រើការបាន",
            "មានយានជំនិះផ្ទាល់ខ្លួន និងប័ណ្ណបើកបរត្រឹមត្រូវ",
        ],
    },
    {
        "t": "Production Supervisor — Extrusion",
        "t_km": "អ្នកគ្រប់គ្រងផលិតកម្ម — ខ្សែពន្លាត",
        "dept": "Production",
        "dept_km": "ផ្នែកផលិតកម្ម",
        "loc": "Prek Phnov Factory",
        "loc_km": "រោងចក្រព្រែកភ្នៅ",
        "r": [
            "Run the extrusion shift: output targets, line changeovers and machine settings",
            "Keep dimensional checks on schedule and log the results",
            "Coach operators on safety and quality procedures",
        ],
        "r_km": [
            "គ្រប់គ្រងវេនពន្លាត៖ គោលដៅទិន្នផល ការប្តូរខ្សែ និងការកំណត់ម៉ាស៊ីន",
            "រក្សាការត្រួតពិនិត្យវិមាត្រតាមកាលវិភាគ និងកត់ត្រាលទ្ធផល",
            "ណែនាំប្រតិបត្តិករអំពីនីតិវិធីសុវត្ថិភាព និងគុណភាព",
        ],
        "q": [
            "Experience supervising plastic extrusion or a similar continuous process",
            "Comfortable reading dimension tables and using gauges",
            "Able to work rotating shifts",
        ],
        "q_km": [
            "បទពិសោធន៍ត្រួតពិនិត្យខ្សែពន្លាតប្លាស្ទិក ឬដំណើរការបន្តប្រហាក់ប្រហែល",
            "អាចអានតារាងវិមាត្រ និងប្រើឧបករណ៍វាស់បានយ៉ាងស្ទាត់",
            "អាចធ្វើការប្តូរវេនបាន",
        ],
    },
    {
        "t": "QA / QC Technician",
        "t_km": "អ្នកបច្ចេកទេស QA / QC",
        "dept": "Quality",
        "dept_km": "ផ្នែកគុណភាព",
        "loc": "Prek Phnov Factory",
        "loc_km": "រោងចក្រព្រែកភ្នៅ",
        "r": [
            "Run tensile, impact, hydrostatic pressure and reversion tests to the published methods",
            "Record results and raise non-conformance reports",
            "Support internal and external ISO 9001:2015 audits",
        ],
        "r_km": [
            "ធ្វើតេស្តកម្លាំងតាន់ស៊ីល ផលប៉ះពាល់ សម្ពាធសន្ទនីយស្តាទិច និង reversion តាមវិធីសាស្ត្រដែលបានបោះពុម្ព",
            "កត់ត្រាលទ្ធផល និងលើករបាយការណ៍មិនអនុលោម",
            "គាំទ្រសវនកម្ម ISO 9001:2015 ផ្ទៃក្នុង និងក្រៅ",
        ],
        "q": [
            "Diploma or degree in engineering, chemistry or a related field",
            "Careful with measurement and documentation",
            "Fresh graduates with strong lab discipline will be considered",
        ],
        "q_km": [
            "សញ្ញាបត្រ ឬបរិញ្ញាបត្រផ្នែកវិស្វកម្ម គីមី ឬវិស័យពាក់ព័ន្ធ",
            "យកចិត្តទុកដាក់លើការវាស់វែង និងឯកសារ",
            "និស្សិតបញ្ចប់ការសិក្សាថ្មីដែលមានវិន័យមន្ទីរពិសោធន៍រឹងមាំនឹងត្រូវពិចារណា",
        ],
    },
    {
        "t": "Warehouse & Logistics Coordinator",
        "t_km": "អ្នកសម្របសម្រួលឃ្លាំង និងភស្តុភារ",
        "dept": "Operations",
        "dept_km": "ផ្នែកប្រតិបត្តិការ",
        "loc": "Prek Phnov Factory",
        "loc_km": "រោងចក្រព្រែកភ្នៅ",
        "r": [
            "Plan loading and delivery routes to sites across Phnom Penh and the provinces",
            "Keep stock records accurate between the system and the racks",
            "Coordinate with sales on urgent site deliveries",
        ],
        "r_km": [
            "រៀបចំផែនការផ្ទុក និងផ្លូវដឹកជញ្ជូនទៅកាន់ទីតាំងនានាទូទាំងភ្នំពេញ និងតាមខេត្ត",
            "រក្សាកំណត់ត្រាស្តុកឱ្យត្រឹមត្រូវរវាងប្រព័ន្ធ និងធ្នើរ",
            "សម្របសម្រួលជាមួយផ្នែកលក់លើការដឹកជញ្ជូនបន្ទាន់ទៅកាន់ទីតាំង",
        ],
        "q": [
            "Warehouse or logistics experience in building materials",
            "Confident with spreadsheets and stock systems",
            "Organised under pressure",
        ],
        "q_km": [
            "បទពិសោធន៍ឃ្លាំង ឬភស្តុភារក្នុងសម្ភារៈសំណង់",
            "ពូកែប្រើសៀវភៅបញ្ជី និងប្រព័ន្ធស្តុក",
            "ចេះរៀបចំបានល្អនៅពេលមានសម្ពាធ",
        ],
    },
    {
        "t": "Marketing Officer — Digital",
        "t_km": "មន្ត្រីទីផ្សារ — ឌីជីថល",
        "dept": "Sales & Marketing",
        "dept_km": "ផ្នែកលក់ និងទីផ្សារ",
        "loc": "Head Office",
        "loc_km": "ការិយាល័យកណ្តាល",
        "r": [
            "Run the Facebook, TikTok and Telegram channels and the product content on them",
            "Shoot and edit short product and factory video",
            "Support exhibitions, distributor days and print material",
        ],
        "r_km": [
            "គ្រប់គ្រងឆានែល Facebook, TikTok និង Telegram និងខ្លឹមសារផលិតផលនៅលើពួកវា",
            "ថត និងកែវីដេអូខ្លីផលិតផល និងរោងចក្រ",
            "គាំទ្រពិព័រណ៍ ថ្ងៃអ្នកចែកចាយ និងសម្ភារៈបោះពុម្ព",
        ],
        "q": [
            "1+ years in digital marketing, ideally B2B or construction",
            "Can shoot and cut video on a phone to a good standard",
            "Khmer copywriting, working English",
        ],
        "q_km": [
            "បទពិសោធន៍ទីផ្សារឌីជីថល ១ ឆ្នាំឡើង និយម B2B ឬសំណង់",
            "អាចថត និងកាត់វីដេអូលើទូរស័ព្ទបានកម្រិតល្អ",
            "សរសេរខ្លឹមសារខ្មែរ ភាសាអង់គ្លេសប្រើការបាន",
        ],
    },
]

# ------------------------------------------------------------------
# Clients
# ------------------------------------------------------------------
CLIENTS = [
    ("ORKIDE Development", 0), ("Borey Kheang Heng", 0), ("TV Star Villa House", 0),
    ("Borey New Hope", 0), ("Long Ny", 0), ("Borey LV", 0), ("The Blue Sky Tower", 0),
    ("ACLEDA", 0), ("B&BM Development", 0), ("Kang Hwa E&C", 0), ("Mekong Royal", 0),
    ("Lionhart", 0), ("Pisnoka", 0), ("Pitta Engineering", 0), ("KOFI", 0), ("TEAMS", 0),
    ("Senserey Construction", 0), ("Borey Grand Park", 0), ("Pimoup Rasmey", 0),
    ("Galaxy Residence", 0),
    ("AEON MALL Phnom Penh", 1), ("Booyoung Town", 1), ("Jebsen & Jessen", 1),
    ("Sumitomo Mitsui Construction", 1), ("Diamond One", 1),
]

# ------------------------------------------------------------------
# Site meta
# ------------------------------------------------------------------
META = {
    "company": "UPG PIPE CO., LTD",
    "tagline": "Made in Cambodia",
    "iso": "ISO 9001:2015",
    "phone": "+855 (0)23 939 399",
    "phone_tel": "+85523939399",
    "email": "sales@upgpipe.com",
    "hr_email": "hr@upgpipe.com",
    "office_hours": "Monday–Saturday, 7:30–17:00",
    "head_office": {
        "label": "Head office",
        "line1": "Building #6, St. 289, Sangkat Boeung Kak 2,",
        "line2": "Khan Toul Kork, Phnom Penh, Cambodia",
    },
    "factory": {
        "label": "Factory",
        "line1": "Phoum Por Mongkoul, Sangkat Prek Phnov,",
        "line2": "Khan Prek Phnov, Phnom Penh, Cambodia",
    },
    "staff_head_office": 30,
    "staff_factory": 147,
    "staff_total": 177,
    "founded": "June 2016",
    "sizes_rail": [
        '21 mm · 1/2"', '27 mm · 3/4"', '34 mm · 1"', '42 mm · 1 1/4"', '49 mm · 1 1/2"',
        '60 mm · 2"', '75 mm · 2 1/2"', '90 mm · 3"', '100 mm · 4"', '125 mm · 5"',
        '165 mm · 6"', '200 mm · 8"', '250 mm · 10"', '300 mm · 12"',
    ],
    "certificate": {
        "standard": "ISO 9001:2015",
        "number": "745371",
        "registrar": "Guardian Independent Certification Ltd",
        "scope": "Manufacturing of uPVC, HDPE, LDPE, PPR pipes, and electrical cable conduits and fitting products",
        "issued": "22 March 2024",
        "expires": "21 March 2027",
        "first_certified": "2017",
    },
    "team": [
        {"name": "Rin Sokha", "name_km": "រិន សុខា", "role": "Chief Executive Officer", "role_km": "នាយកប្រតិបត្តិ", "color": "#0B57A4", "img": "/images/team/p1.png"},
        {"name": "Ly Channarith", "name_km": "លី ចន្នីរិទ្ធ", "role": "Executive Assistant to the CEO", "role_km": "ជំនួយការនាយកប្រតិបត្តិ", "color": "#12A150", "img": "/images/team/p2.png"},
        {"name": "Sao Sokheng", "name_km": "សាវ សុខេង", "role": "Head of Sales", "role_km": "ប្រធានផ្នែកលក់", "color": "#E0A106", "img": "/images/team/p3.png"},
        {"name": "Khun Kimheng", "name_km": "ខុន គឹមហេង", "role": "Head of Quality", "role_km": "ប្រធានផ្នែកគុណភាព", "color": "#2278CA", "img": "/images/team/p4.png"},
        {"name": "Chan Sreyroth", "name_km": "ចាន់ ស្រីរតន៍", "role": "Head of HR", "role_km": "ប្រធានផ្នែកធនធានមនុស្ស", "color": "#E4002B", "img": ""},
        {"name": "Heng Dara", "name_km": "ហេង ដារា", "role": "Head of Warehouse & Logistics", "role_km": "ប្រធានផ្នែកឃ្លាំង និងភស្តុភារ", "color": "#0C3466", "img": ""},
        {"name": "Chea Sovannara", "name_km": "ជា សុវណ្ណារ៉ា", "role": "Head of R&D & Technical", "role_km": "ប្រធានផ្នែកបច្ចេកទេស និងស្រាវជ្រាវ", "color": "#2BA7E0", "img": ""},
        {"name": "Kong Sopheak", "name_km": "គង់ សុភ័ក្ត្រ", "role": "Head of Finance", "role_km": "ប្រធានផ្នែកហិរញ្ញវត្ថុ", "color": "#F2B705", "img": ""},
        {"name": "Meng Sopheap", "name_km": "ម៉េង សុភាព", "role": "Head of Marketing", "role_km": "ប្រធានផ្នែកទីផ្សារ", "color": "#07213F", "img": ""},
        {"name": "Thoun Vibol", "name_km": "ធន់ វិបុល", "role": "Head of Production", "role_km": "ប្រធានផ្នែកផលិតកម្ម", "color": "#C70F2D", "img": ""},
    ],
}
