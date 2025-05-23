const customTranslations: Record<string, Record<string, string>> = {
  english: {
    home_title: "Food analyzer app is a personalized GenAI nutritional application for your shopping and cooking recipes",
    home_subtitle: "Choose an option from the list to test out",
    lang_label: "English",
    menu_history: "History",
    menu_scan: "Product Information",
    menu_recipe: "Recipe Generator",
    menu_analysis: "Analysis",
    menu_preferences: "Preferences",
    menu_profil: "Profile",
    menu_signout: "SignOut",
    scan_button_label: "Scan",
    scan_button_number_label: "Input the barcode number",
    scan_main_title:
      "Obtain personalized nutritional information for your product",
    scan_label_1: "Set your",
    scan_label_2: "preferences",
    scan_label_3: 'Click on "Scan barcode" and scan a bar code',
    scan_label_4: "See the personalised description of your scanned product",
    recipe_main_title:
      "Use a picture with ingredients to generate personalized recipes aligned with your food preferences.",
    recipe_label_1: "Set your",
    recipe_label_2: "preferences",
    recipe_label_3:
      'Click on "Take Fridge Photo" and take a photo of your ingredients',
    recipe_label_4: "See the personalised recipes from your ingredients",
    recipe_button_label: "Take Fridge Photo",
    recipe_button_file_label: "Choose file",
    scan_scanning_label: "Identifying the product",
    product_name_label: "Product",
    scan_scanned_label: "Scanned code",
    ingredients_not_found:
      "Unable to locate the product within the Open Food Facts API database. Please try scanning a different product.",
    ingredients_title1: "Here are the ingredients found in the product",
    ingredients_title2: "Here are the additives found in the product",
    ingredients_desc_ingredient:
      "Click on each ingredient to view AI-generated detailed descriptions",
    ingredients_desc_additive:
      "Click on each additive to view AI-generated detailed descriptions",
    ingredients_no_additive: "The product does not have additives",
    summary_title: "Summary of ingredients generated by AI",
    summary_benefits_title: "Benefits",
    summary_disadvantages_title: "Disadvantages",
    image_title: "Image depicting product composition generated by AI",
    image_loading_text: "Loading image representing the product composition",
    preference_title: "Dietary Preferences",
    preference_title_allergies: "Allergies",
    preference_title_other: "Dietary Preferences",
    preference_other_placeholder: "I want to eat healthy",
    recipe_retake_photo: "Capture new photo",
    recipe_use_this: "Use selected image",
    recipe_search_video_src: "Searching for video devices in progress ...",
    recipe_take_picture: "Capture image",
    image_ingredients_loading: "Identifying ingredients in image...",
    image_ingredients_title:
      "Here are the ingredients detected in the image using AI",
    image_ingredients_not_found:
      "No ingredients detected in the image. Please try again.",
    recipe_loading_recipe: "Generating recipes with AI ...",
    recipe_difficulty: "Difficulty",
    recipe_preparation_time: "Preparation time",
    recipe_cooking_time: "Cooking time",
    recipe_ingredients: "Ingredients",
    recipe_button_guide: "Step-by-Step Guide",
    recipe_loading_guide: "Loading step by step guide...",
    recipe_step_number: "Step",
    recipe_step_ingredients: "Ingredients list for this step",
    recipe_optional_ingredients: "Additional ingredients",
    recipe_proposal_title: "Here are 3 recipe suggestions generated by AI",
    dev_mode_title: "Other Preferences",
    dev_mode_label: "Advanced mode",
    video_analysis_title: "Video Analysis",
    video_analysis_description: "Analyze food videos to extract ingredients, recipes, and cooking techniques",
    video_analysis_upload_label: "Upload video to analyze",
    video_analysis_upload_description: "Upload a cooking or food-related video to extract food items, recipes, and tips",
    video_analysis_youtube_label: "Enter YouTube URL",
    video_analysis_youtube_description: "Provide a URL to a cooking or food-related YouTube video",
    video_analysis_analyzing: "Video analysis is in progress. This may take several minutes depending on the length of the video.",
    video_analysis_cancel: "Cancel Analysis",
    video_analysis_food_items: "Food Items Detected",
    video_analysis_recipes: "Recipes Mentioned",
    video_analysis_techniques: "Cooking Techniques",
    video_analysis_equipment: "Equipment Used",
    video_analysis_tips: "Actionable Tips",
    video_analysis_insights: "Nutritional Insights",
    manual_input_label: "Enter Barcode Manually",
  },
  french: {
    home_title: "L'application Food Analyzer est une application nutritionnelle personnalisée GenAI pour vos achats et vos recettes de cuisine",
    home_subtitle: "Choisissez une option dans la liste pour tester",
    lang_label: "Français",
    menu_history: "Historique",
    menu_scan: "Informations Produit",
    menu_recipe: "Générateur de Recettes",
    menu_analysis: "Générateur de Analyses",
    menu_preferences: "Préférences",
    menu_profil: "Profil",
    menu_signout: "Déconnexion",
    scan_button_label: "Scanner",
    scan_button_number_label: "Saisir le numéro de code-barres",
    scan_main_title:
      "Obtenez des informations nutritionnelles personnalisées pour votre produit",
    scan_label_1: "Configurer vos ",
    scan_label_2: "préférences",
    scan_label_3:
      'Cliquez sur "Scanner un code-barres" et scannez un code-barres',
    scan_label_4:
      "Consultez la description personnalisée de votre produit scanné",
    recipe_main_title:
      "Utilisez une photo avec des ingrédients pour générer des recettes personnalisées alignées avec vos préférences alimentaires",
    recipe_label_1: "Configurer vos",
    recipe_label_2: "préférences",
    recipe_label_3:
      'Cliquez sur "Photo du Frigo" et prenez une photo de vos ingrédients',
    recipe_label_4:
      "Consultez les recettes personnalisées à partir de vos ingrédients",
    recipe_button_label: "Photo du Frigo",
    recipe_button_file_label: "Choisir un fichier",
    scan_scanning_label: "Identifier le produit",
    scan_scanned_label: "Code scanné",
    ingredients_not_found:
      "Impossible de localiser le produit dans la base de données de l'API Open Food Facts. Veuillez essayer de scanner un autre produit.",
    ingredients_title1: "Voici les ingrédients trouvés dans le produit",
    ingredients_title2: "Voici les additifs trouvés dans le produit",
    ingredients_desc_ingredient:
      "Cliquez sur chaque ingrédient pour voir les descriptions détaillées générées par l'IA",
    ingredients_desc_additive:
      "Cliquez sur chaque additif pour voir les descriptions détaillées générées par l'IA",
    ingredients_no_additive: "Le produit ne contient pas d'additifs",
    summary_title: "Résumé des ingrédients généré par IA",
    summary_benefits_title: "Avantages",
    summary_disadvantages_title: "Inconvénients",
    image_title: "Image représentant la composition du produit générée par IA",
    preference_title: "Préférences Alimentaires",
    preference_title_allergies: "Allergies",
    preference_title_other: "Préférences Alimentaires",
    preference_other_placeholder: "Je veux manger sainement",
    image_loading_text:
      "Génération de l'image représentant la composition du produit par IA",
    product_name_label: "Produit",
    recipe_retake_photo: "Prendre une nouvelle photo",
    recipe_use_this: "Utiliser cette image",
    recipe_search_video_src: "Recherche des appareils vidéo en cours...",
    recipe_take_picture: "Prendre une photo",
    image_ingredients_loading: "Identification des ingrédients dans l'image...",
    image_ingredients_title:
      "Voici les ingrédients détectés dans l'image à l'aide de l'IA",
    image_ingredients_not_found:
      "Aucun ingrédient détecté dans l'image. Veuillez réessayer.",
    recipe_loading_recipe: "Génération de recettes avec l'IA...",
    recipe_difficulty: "Difficulté",
    recipe_preparation_time: "Temps de préparation",
    recipe_cooking_time: "Temps de cuisson",
    recipe_ingredients: "Ingrédients",
    recipe_button_guide: "Guide étape par étape",
    recipe_loading_guide: "Chargement du guide étape par étape...",
    recipe_step_number: "Étape",
    recipe_step_ingredients: "Liste des ingrédients pour cette étape",
    recipe_optional_ingredients: "Ingrédients additionnels",
    recipe_proposal_title: "Voici 3 suggestions de recettes générées par l'IA",
    dev_mode_title: "Autre préférences",
    dev_mode_label: "Mode avancé",
    manual_input_label: "Enter Barcode Manually",
  },
  italian: {
    home_title: "Food Analyzer è un'app nutrizionale personalizzata GenAI per i tuoi acquisti e le tue ricette di cucina",
    home_subtitle: "Scegli un'opzione dalla lista per testarla",
    lang_label: "Italiano",
    menu_history: "Cronologia",
    menu_scan: "Informazioni sul Prodotto",
    menu_recipe: "Generatore di Ricette",
    menu_preferences: "Preferenze",
    menu_profil: "Profilo",
    menu_signout: "Esci",
    scan_button_label: "Scansiona",
    scan_button_number_label: "inserire il numero di codice a barre",
    scan_main_title:
      "Ottieni informazioni nutrizionali personalizzate per il tuo prodotto.",
    scan_label_1: "Imposta le tue",
    scan_label_2: "preferenze",
    scan_label_3:
      'Clicca su "Scansiona codice a barre" e scansiona un codice a barre',
    scan_label_4:
      "Visualizza la descrizione personalizzata del prodotto scansionato",
    recipe_main_title:
      "Utilizza una foto con gli ingredienti per generare ricette personalizzate in linea con le tue preferenze alimentari",
    recipe_label_1: "Imposta le tue",
    recipe_label_2: "preferenze",
    recipe_label_3:
      'Clicca su "Scatta foto del frigorifero" e scatta una foto dei tuoi ingredienti',
    recipe_label_4: "Visualizza le ricette personalizzate dai tuoi ingredienti",
    recipe_button_label: "Scatta foto del frigorifero",
    recipe_button_file_label: "Scegli file",
    scan_scanning_label: "Identificazione del prodotto",
    product_name_label: "Prodotto",
    scan_scanned_label: "Codice scansionato",
    ingredients_not_found:
      "Impossibile trovare il prodotto nel database di Open Food Facts. Prova a scansionare un prodotto diverso.",
    ingredients_title1: "Ecco gli ingredienti trovati nel prodotto",
    ingredients_title2: "Ecco gli additivi trovati nel prodotto",
    ingredients_desc_ingredient:
      "Fai clic su ogni ingrediente per visualizzare le descrizioni dettagliate generate dall’AI",
    ingredients_no_additive: "Il prodotto non contiene additivi",
    ingredients_desc_additive:
      "Fai clic su ogni additivo per visualizzare le descrizioni dettagliate generate dall’AI",
    summary_title: "Riepilogo degli ingredienti generato dall’AI",
    summary_benefits_title: "Benefici",
    summary_disadvantages_title: "Svantaggi",
    image_title:
      "Immagine che raffigura la composizione del prodotto generata dall’AI",
    image_loading_text:
      "Caricamento dell’immagine che rappresenta la composizione del prodotto",
    preference_title: "Preferenze alimentari",
    preference_title_allergies: "Allergie",
    preference_title_other: "Preferenze alimentari",
    preference_other_placeholder: "Voglio mangiare in modo sano",
    recipe_retake_photo: "Riprova",
    recipe_use_this: "Usa",
    recipe_search_video_src: "Ricerca di dispositivi video in corso…",
    recipe_take_picture: "Cattura immagine",
    image_ingredients_loading:
      "Identificazione degli ingredienti nell’immagine…",
    image_ingredients_title:
      "Ecco gli ingredienti rilevati nell’immagine utilizzando l’AI",
    image_ingredients_not_found:
      "Nessun ingrediente rilevato nell’immagine. Riprova.",
    recipe_loading_recipe: "Generazione di ricette con l’AI…",
    recipe_difficulty: "Difficoltà",
    recipe_preparation_time: "Tempo di preparazione",
    recipe_cooking_time: "Tempo di cottura",
    recipe_ingredients: "Ingredienti",
    recipe_button_guide: "Guida passo-passo",
    recipe_loading_guide: "Caricamento della guida passo-passo…",
    recipe_step_number: "Fase",
    recipe_step_ingredients: "Elenco degli ingredienti per questa fase",
    recipe_optional_ingredients: "Ingredienti aggiuntivi",
    recipe_proposal_title: "Ecco 3 proposte di ricette generate dall’IA",
    dev_mode_title: "Altre preferenze",
    dev_mode_label: "Modalità avanzata",
    manual_input_label: "Enter Barcode Manually",
  },
  spanish: {
    home_title: "La aplicación Food Analyzer es una aplicación nutricional personalizada GenAI para tus compras y recetas de cocina",
    home_subtitle: "Elige una opción de la lista para probarla",
    lang_label: "Español",
    menu_history: "Historia",
    menu_scan: "Información del Producto",
    menu_recipe: "Generador de Recetas",
    menu_preferences: "Preferencias",
    menu_profil: "Perfil",
    menu_signout: "Cerrar sesión",
    scan_button_label: "Escanear",
    scan_button_number_label: "Introduzca el número de código de barras",
    scan_main_title:
      "Obtén información nutricional personalizada para tu producto.",
    scan_label_1: "Configura tus",
    scan_label_2: "preferencias",
    scan_label_3:
      'Haz clic en "Escanear código de barras" y escanea un código de barras',
    scan_label_4: "Ve la descripción personalizada de tu producto escaneado",
    recipe_main_title:
      "Usa una foto con ingredientes para generar recetas personalizadas alineadas con tus preferencias alimentarias",
    recipe_label_1: "Configura tus",
    recipe_label_2: "preferencias",
    recipe_label_3:
      'Haz clic en "Tomar foto del refrigerador" y toma una foto de tus ingredientes',
    recipe_label_4: "Ve las recetas personalizadas de tus ingredientes",
    recipe_button_label: "Tomar foto del refrigerador",
    recipe_button_file_label: "Seleccionar archivo",
    scan_scanning_label: "Identificando el producto",
    product_name_label: "Producto",
    scan_scanned_label: "Código escaneado",
    ingredients_not_found:
      "No se pudo encontrar el producto en la base de datos de la API de Open Food Facts. Intenta escanear otro producto.",
    ingredients_title1:
      "Aquí están los ingredientes encontrados en el producto",
    ingredients_title2: "Aquí están los aditivos encontrados en el producto",
    ingredients_desc_ingredient:
      "Haz clic en cada ingrediente para ver descripciones detalladas generadas por IA",
    ingredients_no_additive: "El producto no contiene aditivos",
    ingredients_desc_additive:
      "Haz clic en cada aditivo para ver descripciones detalladas generadas por IA",
    summary_title: "Resumen de ingredientes generados por IA",
    summary_benefits_title: "Beneficios",
    summary_disadvantages_title: "Desventajas",
    image_title:
      "Imagen que muestra la composición del producto generada por IA",
    image_loading_text:
      "Cargando imagen que representa la composición del producto",
    preference_title: "Preferencias dietéticas",
    preference_title_allergies: "Alergias",
    preference_title_other: "Preferencias dietéticas",
    preference_other_placeholder: "Quiero comer saludable",
    recipe_retake_photo: "Capturar nueva foto",
    recipe_use_this: "Usar imagen seleccionada",
    recipe_search_video_src: "Buscando dispositivos de video en progreso ...",
    recipe_take_picture: "Capturar imagen",
    image_ingredients_loading: "Identificando ingredientes en la imagen...",
    image_ingredients_title:
      "Aquí están los ingredientes detectados en la imagen usando IA",
    image_ingredients_not_found:
      "No se detectaron ingredientes en la imagen. Inténtalo de nuevo.",
    recipe_loading_recipe: "Generando recetas con IA ...",
    recipe_difficulty: "Dificultad",
    recipe_preparation_time: "Tiempo de preparación",
    recipe_cooking_time: "Tiempo de cocción",
    recipe_ingredients: "Ingredientes",
    recipe_button_guide: "Guía paso a paso",
    recipe_loading_guide: "Cargando guía paso a paso...",
    recipe_step_number: "Paso",
    recipe_step_ingredients: "Lista de ingredientes para este paso",
    recipe_optional_ingredients: "Ingredientes adicionales",
    recipe_proposal_title:
      "Aquí tienes 3 sugerencias de recetas generadas por IA",
    dev_mode_title: "Otras preferencias",
    dev_mode_label: "Modo avanzado",
    manual_input_label: "Enter Barcode Manually",
  },
};

export default customTranslations;
