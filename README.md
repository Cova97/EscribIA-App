# EscribIA

EscribIA es una web app académica de nivel universitario que ayuda a corregir textos proporcionados por los usuarios. Utiliza la tecnología de OpenAI para analizar los textos, ofrecer sugerencias, corregir errores y asignar una calificación final. Es ideal para estudiantes y académicos que desean mejorar la calidad de sus escritos.

## Características

- **Corrección automática de textos**: Proporciona sugerencias y corrige errores en los textos ingresados.
- **Calificación**: Después de realizar la corrección, EscribIA asigna una calificación final al texto.
- **Interfaz amigable**: La app está construida con React y Vite, utilizando Chakra UI para un diseño moderno y accesible.

## Tecnologías utilizadas

- **Vite + React**: Frontend rápido y eficiente.
- **Chakra UI**: Librería de componentes que facilita el diseño de interfaces accesibles y estilizadas.
- **OpenAI**: Tecnología detrás del análisis, corrección y calificación de los textos.
- **API desplegada en Render**: La API que procesa los textos está desplegada en [Render](https://escribia-api.onrender.com/procesar_texto).

## Instalación

Sigue estos pasos para ejecutar la aplicación localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/escribia.git
   ```
   
2. Entra en el directorio del proyecto:
   ```bash
   cd escribia
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Ejecuta la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en `http://localhost:3000` para ver la aplicación en funcionamiento.

## Uso

1. Ingresa el texto que deseas corregir en el cuadro de texto de la aplicación.
2. Haz clic en el botón para procesar el texto.
3. La app enviará el texto a la API de EscribIA y te mostrará las sugerencias, el texto corregido y una calificación final.

## API

EscribIA se conecta a la API desplegada en Render para procesar los textos. La URL de la API es:

- `https://escribia-api.onrender.com/procesar_texto`

## Contribuciones

Este proyecto es de carácter académico, pero si deseas colaborar o proponer mejoras, no dudes en hacer un fork y enviar un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
