# Brief de proyecto — Seashell

Landing page para **Seashell**, negocio de venta de joyería y accesorios. Este documento es el brief/informe de referencia para el desarrollador. Ya existe una plantilla base de HTML y un prompt inicial entregado por separado para adaptarla al negocio; este README complementa esa información con datos del negocio, branding, estilo visual, animaciones e instrucciones sobre los assets.

**No se define aquí la estructura de secciones de la página** — el desarrollador debe seguir la estructura que ya trae la plantilla base.

---

## 1. Sobre el negocio

**Nombre:** Seashell

**Descripción:** Venta de joyería y accesorios, al menudeo y al mayoreo. Entre los clientes hay personas que compran para revender (emprendedores/reventa).

**Productos/servicios:**
- Joyería de plata 9.25 (925)
- Joyería en acero con chapa de oro
- Oro laminado
- Anillos/bandas de boda ("bodas de dama")
- Carteras/billeteras de hombre
- Bolsos y carteras de dama
- Perfumes
- Cinturones
- Peluches
- Gorras
- Otros accesorios varios

**Canal de venta:** redes sociales (Facebook, WhatsApp). El negocio no tiene dirección física ni horario fijo para publicar — no incluir esos datos en la página.

> Nota: no se encontró en el material entregado ningún dato adicional de contacto (teléfono, WhatsApp, correo). Si el cliente los proporciona más adelante, se agregan en la sección de contacto que ya trae la plantilla base.

---

## 2. Branding e identidad visual

No se recibió un archivo de logo. La paleta y tipografía sugeridas a continuación se derivaron del propio catálogo de fotos (fondos de terciopelo negro, metal dorado y plateado como protagonistas, y piezas con incrustación de nácar/abalón en tonos azul-verdosos, coherentes con el nombre "Seashell").

**Paleta de colores:**

| Uso | Color | HEX |
|---|---|---|
| Fondo principal / elegancia | Negro profundo | `#0B0B0D` |
| Acento principal (dorado) | Oro champán | `#C9A96A` |
| Metal secundario | Plata | `#C7C9CC` |
| Acento nácar/abalón (ligado al nombre "Seashell") | Turquesa nácar | `#1F8A94` |
| Fondo claro / espacios en blanco | Blanco hueso | `#F7F5F1` |
| Texto sobre fondo claro | Negro suave | `#1A1A1A` |

**Tipografía sugerida:**
- Encabezados: **Playfair Display** (serif, editorial, transmite lujo).
- Cuerpo de texto / UI: **Inter** (sans-serif limpia y moderna, alta legibilidad).

**Identidad visual:** joyería fina con estética de exhibidor de lujo — fondos oscuros, metal dorado/plateado como protagonista, mucho espacio en blanco y acabados minimalistas.

---

## 3. Estilo visual obligatorio

- Estilo **premium, enterprise y de marca corporativa**.
- Nivel **big tech**: elegante y a la vez minimalista.

## 4. Efectos y animaciones requeridos

- Efectos visuales y animaciones activadas por scroll.
- Pantalla de carga (**preloader**) con spinner + logo del negocio.
- Animación en el título del hero: efecto máquina de escribir, cambio de color en las letras u otro efecto tipográfico similar.

---

## 5. Assets e imágenes

- El logo **no fue proporcionado**. El desarrollador debe crear un logotipo simple basado en texto (wordmark), usando la tipografía y colores definidos en la sección de branding, hasta que el cliente entregue un logo definitivo.
- Si más adelante se recibe un archivo de logo con fondo, **remover el fondo antes de usarlo**.
- La carpeta `imagenes/` contiene aproximadamente 110 fotos. **No es necesario ni conveniente usarlas todas.** Seleccionar un máximo de **30 fotos**:
  - ~20 fotos de joyería (las de mejor calidad/iluminación).
  - ~6 fotos de bolsos/carteras.
  - Descartar el resto antes de integrarlas al proyecto (no cargar las ~110 fotos completas).
- Optimizar/comprimir las fotos seleccionadas para web antes de usarlas.

---

## 6. Nota para el desarrollador

Puedes iterar sobre el proyecto dándole instrucciones a Claude Code las veces que sea necesario hasta lograr el resultado deseado.

---

## Checklist

- [ ] Crear un logotipo simple (wordmark) con el nombre "Seashell" usando la tipografía y paleta definidas
- [ ] Si se recibe un logo con fondo más adelante, removerle el fondo antes de integrarlo
- [ ] Seleccionar máximo 30 fotos de `imagenes/` (~20 de joyería + ~6 de bolsos/carteras) y descartar el resto
- [ ] Optimizar/comprimir las fotos seleccionadas para web
- [ ] Aplicar la paleta de colores y tipografía definidas sobre la plantilla base
- [ ] Implementar preloader (spinner + logo)
- [ ] Implementar animaciones activadas por scroll
- [ ] Implementar animación tipográfica en el título del hero (máquina de escribir, cambio de color u otro efecto)
- [ ] Verificar responsividad y velocidad de carga tras optimizar imágenes
- [ ] Iterar con Claude Code hasta lograr el resultado deseado
