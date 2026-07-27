/* ==========================================================================
   VALSET ENGLISH — Contenido pedagógico
   Estructura pensada para bachillerato técnico: A1 → A2 → B1 (MCER)
   ========================================================================== */
const VALSET_DATA = {

  levels: {

    a1: {
      code: "A1", name: "Acceso", cls: "lvl-a1",
      tagline: "Primeros pasos: preséntate, habla de tu familia y de tu día a día.",
      skills: ["Presentarte", "Deletrear y saludar", "Hablar de tu rutina", "Números y horas"],
      topics: [
        {
          id: "greetings", icon: "greetings", title: "Saludos y presentación personal",
          intro: "Frases esenciales para saludar, despedirte y presentarte en inglés.",
          organizer: {
            center: "INTRODUCING\nYOURSELF",
            branches: [
              { label: "Greetings", items: ["Hello", "Hi", "Good morning"] },
              { label: "Farewells", items: ["Goodbye", "See you later", "Bye"] },
              { label: "Personal info", items: ["Name", "Age", "Country"] },
              { label: "Courtesy", items: ["Please", "Thank you", "Excuse me"] }
            ]
          },
          vocab: [
            { en: "Hello", pos: "greeting", es: "Hola", ex: "Hello! My name is Ana." },
            { en: "Good morning", pos: "greeting", es: "Buenos días", ex: "Good morning, teacher." },
            { en: "My name is…", pos: "phrase", es: "Me llamo…", ex: "My name is Carlos." },
            { en: "Nice to meet you", pos: "phrase", es: "Mucho gusto", ex: "Nice to meet you, Laura." },
            { en: "How are you?", pos: "question", es: "¿Cómo estás?", ex: "Hi! How are you today?" },
            { en: "I'm fine, thanks", pos: "phrase", es: "Estoy bien, gracias", ex: "I'm fine, thanks. And you?" },
            { en: "Goodbye", pos: "greeting", es: "Adiós", ex: "Goodbye! See you tomorrow." },
            { en: "Classmate", pos: "noun", es: "Compañero(a) de clase", ex: "She is my classmate." }
          ]
        },
        {
          id: "family", icon: "family", title: "La familia",
          intro: "Vocabulario para describir a tu familia y sus relaciones.",
          organizer: {
            center: "FAMILY",
            branches: [
              { label: "Parents", items: ["Mother", "Father"] },
              { label: "Siblings", items: ["Brother", "Sister"] },
              { label: "Grandparents", items: ["Grandmother", "Grandfather"] },
              { label: "Extended", items: ["Aunt", "Uncle", "Cousin"] }
            ]
          },
          vocab: [
            { en: "Mother", pos: "noun", es: "Madre", ex: "My mother works at a hospital." },
            { en: "Father", pos: "noun", es: "Padre", ex: "My father is a technician." },
            { en: "Brother", pos: "noun", es: "Hermano", ex: "I have one brother." },
            { en: "Sister", pos: "noun", es: "Hermana", ex: "My sister is younger than me." },
            { en: "Grandmother", pos: "noun", es: "Abuela", ex: "My grandmother lives near school." },
            { en: "Grandfather", pos: "noun", es: "Abuelo", ex: "My grandfather tells great stories." },
            { en: "Aunt", pos: "noun", es: "Tía", ex: "My aunt visits us on Sundays." },
            { en: "Uncle", pos: "noun", es: "Tío", ex: "My uncle drives a truck." }
          ]
        },
        {
          id: "routine", icon: "routine", title: "Rutina diaria y el tiempo",
          intro: "Describe tu día usando la hora y verbos de rutina.",
          organizer: {
            center: "DAILY\nROUTINE",
            branches: [
              { label: "Morning", items: ["Wake up", "Get up", "Have breakfast"] },
              { label: "School", items: ["Go to school", "Study", "Have class"] },
              { label: "Afternoon", items: ["Have lunch", "Do homework"] },
              { label: "Night", items: ["Have dinner", "Go to bed"] }
            ]
          },
          vocab: [
            { en: "Wake up", pos: "verb", es: "Despertarse", ex: "I wake up at six o'clock." },
            { en: "Get up", pos: "verb", es: "Levantarse", ex: "I get up and make my bed." },
            { en: "Have breakfast", pos: "phrase", es: "Desayunar", ex: "We have breakfast at seven." },
            { en: "Go to school", pos: "phrase", es: "Ir a la escuela", ex: "I go to school by bus." },
            { en: "Do homework", pos: "phrase", es: "Hacer la tarea", ex: "I do homework after lunch." },
            { en: "Go to bed", pos: "phrase", es: "Ir a dormir", ex: "I go to bed at ten o'clock." },
            { en: "O'clock", pos: "time", es: "En punto", ex: "It's three o'clock." },
            { en: "Half past", pos: "time", es: "Y media", ex: "It's half past four." }
          ]
        }
      ]
    },

    a2: {
      code: "A2", name: "Plataforma", cls: "lvl-a2",
      tagline: "Comunícate en situaciones cotidianas: comer fuera, moverte por la ciudad y usar la tecnología.",
      skills: ["Pedir en un restaurante", "Dar y pedir direcciones", "Comprar", "Vocabulario tecnológico"],
      topics: [
        {
          id: "food", icon: "food", title: "La comida y los restaurantes",
          intro: "Frases y vocabulario para pedir comida y comportarte en un restaurante.",
          organizer: {
            center: "AT A\nRESTAURANT",
            branches: [
              { label: "People", items: ["Waiter", "Customer", "Chef"] },
              { label: "Ordering", items: ["Menu", "Order", "Bill"] },
              { label: "Utensils", items: ["Fork", "Knife", "Plate"] },
              { label: "Meals", items: ["Breakfast", "Lunch", "Dinner"] }
            ]
          },
          vocab: [
            { en: "Menu", pos: "noun", es: "Menú", ex: "Can I see the menu, please?" },
            { en: "Waiter", pos: "noun", es: "Mesero", ex: "The waiter recommends the soup." },
            { en: "Order", pos: "verb", es: "Pedir (comida)", ex: "I'd like to order a salad." },
            { en: "Bill", pos: "noun", es: "Cuenta", ex: "Can we have the bill, please?" },
            { en: "Delicious", pos: "adjective", es: "Delicioso", ex: "This soup is delicious." },
            { en: "Fork", pos: "noun", es: "Tenedor", ex: "I need a fork and a knife." },
            { en: "Plate", pos: "noun", es: "Plato", ex: "Please pass me the plate." },
            { en: "Customer", pos: "noun", es: "Cliente", ex: "The customer chose the fish." }
          ]
        },
        {
          id: "city", icon: "city", title: "La ciudad y direcciones",
          intro: "Cómo pedir y dar direcciones para moverte por la ciudad.",
          organizer: {
            center: "GETTING\nAROUND",
            branches: [
              { label: "Directions", items: ["Turn left", "Turn right", "Go straight"] },
              { label: "Places", items: ["Bus stop", "Corner", "Avenue"] },
              { label: "Distance", items: ["Near", "Far", "Between"] },
              { label: "Signs", items: ["Traffic light", "Crosswalk"] }
            ]
          },
          vocab: [
            { en: "Turn left", pos: "phrase", es: "Girar a la izquierda", ex: "Turn left at the corner." },
            { en: "Turn right", pos: "phrase", es: "Girar a la derecha", ex: "Turn right on Main Avenue." },
            { en: "Go straight ahead", pos: "phrase", es: "Seguir derecho", ex: "Go straight ahead for two blocks." },
            { en: "Corner", pos: "noun", es: "Esquina", ex: "The store is on the corner." },
            { en: "Traffic light", pos: "noun", es: "Semáforo", ex: "Stop at the traffic light." },
            { en: "Bus stop", pos: "noun", es: "Parada de autobús", ex: "The bus stop is near the school." },
            { en: "Near", pos: "adjective", es: "Cerca", ex: "The library is very near." },
            { en: "Far", pos: "adjective", es: "Lejos", ex: "My house is far from here." }
          ]
        },
        {
          id: "tech", icon: "tech", title: "Tecnología básica y dispositivos",
          intro: "Vocabulario esencial de computadoras y dispositivos.",
          organizer: {
            center: "DEVICES",
            branches: [
              { label: "Hardware", items: ["Keyboard", "Screen", "Mouse", "Charger"] },
              { label: "Actions", items: ["Download", "Save file", "Turn on/off"] },
              { label: "Connectivity", items: ["Internet", "Password", "Wifi"] },
              { label: "Software", items: ["Application", "File", "Folder"] }
            ]
          },
          vocab: [
            { en: "Computer", pos: "noun", es: "Computadora", ex: "I use my computer for homework." },
            { en: "Keyboard", pos: "noun", es: "Teclado", ex: "This keyboard is very fast." },
            { en: "Screen", pos: "noun", es: "Pantalla", ex: "The screen is broken." },
            { en: "Charger", pos: "noun", es: "Cargador", ex: "Where is the charger?" },
            { en: "Download", pos: "verb", es: "Descargar", ex: "Download the file, please." },
            { en: "Password", pos: "noun", es: "Contraseña", ex: "Type your password to log in." },
            { en: "Application", pos: "noun", es: "Aplicación", ex: "Open the application first." },
            { en: "Save a file", pos: "phrase", es: "Guardar un archivo", ex: "Always save your file before closing." }
          ]
        }
      ]
    },

    b1: {
      code: "B1", name: "Umbral", cls: "lvl-b1",
      tagline: "Inglés técnico y funcional para el mundo del trabajo, el taller y la vida sostenible.",
      skills: ["Vocabulario laboral", "Seguridad industrial", "Medio ambiente", "Describir experiencias"],
      topics: [
        {
          id: "work", icon: "work", title: "El mundo del trabajo y las profesiones técnicas",
          intro: "Vocabulario para hablar del empleo, roles y responsabilidades.",
          organizer: {
            center: "AT WORK",
            branches: [
              { label: "People", items: ["Technician", "Engineer", "Apprentice", "Employer"] },
              { label: "Place", items: ["Workshop", "Factory", "Office"] },
              { label: "Schedule", items: ["Shift", "Overtime", "Deadline"] },
              { label: "Ability", items: ["Skill", "Qualification", "Experience"] }
            ]
          },
          vocab: [
            { en: "Technician", pos: "noun", es: "Técnico(a)", ex: "She works as an electrical technician." },
            { en: "Apprentice", pos: "noun", es: "Aprendiz", ex: "He started as an apprentice in the workshop." },
            { en: "Employer", pos: "noun", es: "Empleador", ex: "My employer values punctuality." },
            { en: "Shift", pos: "noun", es: "Turno", ex: "I work the morning shift." },
            { en: "Deadline", pos: "noun", es: "Fecha límite", ex: "The deadline for the project is Friday." },
            { en: "Skill", pos: "noun", es: "Habilidad", ex: "Teamwork is an important skill." },
            { en: "Qualification", pos: "noun", es: "Calificación / título", ex: "This job requires a technical qualification." },
            { en: "Workshop", pos: "noun", es: "Taller", ex: "The machines are in the workshop." }
          ]
        },
        {
          id: "tools", icon: "tools", title: "Herramientas y seguridad industrial",
          intro: "Nombres de herramientas y vocabulario de seguridad en el taller.",
          organizer: {
            center: "WORKSHOP\nSAFETY",
            branches: [
              { label: "Tools", items: ["Wrench", "Screwdriver", "Pliers", "Drill"] },
              { label: "Protection", items: ["Safety goggles", "Gloves", "Helmet"] },
              { label: "Risks", items: ["Hazard", "Warning sign"] },
              { label: "Emergency", items: ["First aid", "Fire extinguisher"] }
            ]
          },
          vocab: [
            { en: "Wrench", pos: "noun", es: "Llave (herramienta)", ex: "Pass me the wrench, please." },
            { en: "Screwdriver", pos: "noun", es: "Destornillador", ex: "Use a screwdriver to open the panel." },
            { en: "Safety goggles", pos: "noun", es: "Gafas de seguridad", ex: "Always wear safety goggles." },
            { en: "Gloves", pos: "noun", es: "Guantes", ex: "Put on your gloves before starting." },
            { en: "Helmet", pos: "noun", es: "Casco", ex: "A helmet is required on site." },
            { en: "Hazard", pos: "noun", es: "Peligro / riesgo", ex: "That cable is a fire hazard." },
            { en: "First aid", pos: "noun", es: "Primeros auxilios", ex: "The first aid kit is over there." },
            { en: "Fire extinguisher", pos: "noun", es: "Extintor", ex: "The fire extinguisher is near the door." }
          ]
        },
        {
          id: "environment", icon: "environment", title: "Medio ambiente y sostenibilidad",
          intro: "Vocabulario para hablar de sostenibilidad y cuidado ambiental.",
          organizer: {
            center: "SUSTAINABILITY",
            branches: [
              { label: "Problems", items: ["Pollution", "Waste", "Greenhouse gas"] },
              { label: "Solutions", items: ["Recycle", "Reduce", "Reuse"] },
              { label: "Sources", items: ["Solar panel", "Wind turbine"] },
              { label: "Concepts", items: ["Natural resources", "Sustainable"] }
            ]
          },
          vocab: [
            { en: "Recycle", pos: "verb", es: "Reciclar", ex: "We recycle paper and plastic at school." },
            { en: "Pollution", pos: "noun", es: "Contaminación", ex: "Air pollution affects the city." },
            { en: "Renewable energy", pos: "noun", es: "Energía renovable", ex: "Solar power is a renewable energy." },
            { en: "Waste", pos: "noun", es: "Desechos", ex: "The factory reduced its waste." },
            { en: "Sustainable", pos: "adjective", es: "Sostenible", ex: "We need sustainable transport." },
            { en: "Solar panel", pos: "noun", es: "Panel solar", ex: "They installed solar panels on the roof." },
            { en: "Natural resources", pos: "noun", es: "Recursos naturales", ex: "Water is a natural resource." },
            { en: "Reduce", pos: "verb", es: "Reducir", ex: "We must reduce plastic use." }
          ]
        }
      ]
    }
  },

  exercises: {
    a1: [
      { type: "mc", q: "Choose the correct greeting for the morning.", options: ["Good night", "Good morning", "Good afternoon"], answer: "Good morning" },
      { type: "mc", q: "My father's mother is my ___.", options: ["Aunt", "Grandmother", "Sister"], answer: "Grandmother" },
      { type: "mc", q: "What do you say when you meet someone for the first time?", options: ["Goodbye", "Nice to meet you", "Good night"], answer: "Nice to meet you" },
      { type: "fill", sentence: "I ___ up at six o'clock every morning.", hint: "levantarse", answer: "get" },
      { type: "fill", sentence: "We ___ breakfast at seven o'clock.", hint: "desayunar", answer: "have" },
      { type: "match", title: "Une cada palabra con su significado en español.", pairs: [
        ["Hello", "Hola"], ["Goodbye", "Adiós"], ["Thank you", "Gracias"], ["Brother", "Hermano"], ["Sister", "Hermana"], ["Please", "Por favor"]
      ]}
    ],
    a2: [
      { type: "mc", q: "What do you ask for at the end of a meal at a restaurant?", options: ["The menu", "The bill", "The fork"], answer: "The bill" },
      { type: "mc", q: "If you want to go to the street on your right, you should…", options: ["Turn left", "Turn right", "Go straight ahead"], answer: "Turn right" },
      { type: "mc", q: "What do you type to log in to a computer?", options: ["Password", "Keyboard", "Screen"], answer: "Password" },
      { type: "fill", sentence: "Excuse me, could I see the ___, please?", hint: "menú", answer: "menu" },
      { type: "fill", sentence: "The library is very ___, so I walk there in two minutes.", hint: "cerca", answer: "near" },
      { type: "match", title: "Une cada palabra con su significado en español.", pairs: [
        ["Bill", "Cuenta"], ["Waiter", "Mesero"], ["Keyboard", "Teclado"], ["Download", "Descargar"], ["Avenue", "Avenida"], ["Charger", "Cargador"]
      ]}
    ],
    b1: [
      { type: "mc", q: "Before using the drill, workers must put on their ___.", options: ["Safety goggles", "Backpack", "Menu"], answer: "Safety goggles" },
      { type: "mc", q: "A person learning a trade while working under a technician is called a/an ___.", options: ["Employer", "Apprentice", "Customer"], answer: "Apprentice" },
      { type: "mc", q: "Solar panels are an example of ___ energy.", options: ["Renewable", "Wasted", "Dangerous"], answer: "Renewable" },
      { type: "fill", sentence: "In case of fire, use the ___ near the workshop entrance.", hint: "extintor", answer: "fire extinguisher" },
      { type: "fill", sentence: "My employer asked me to finish the report before the ___.", hint: "fecha límite", answer: "deadline" },
      { type: "match", title: "Une cada palabra con su significado en español.", pairs: [
        ["Wrench", "Llave (herramienta)"], ["Hazard", "Peligro"], ["Pollution", "Contaminación"], ["Recycle", "Reciclar"], ["Technician", "Técnico"], ["Shift", "Turno"]
      ]}
    ]
  }
};
