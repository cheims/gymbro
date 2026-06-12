# 💪 GymBro

App de gimnasio personal (PWA instalable, mobile-first, sin servidor).
Crea rutinas por **tiempo** y **nivel**, calcula tu **IMC**, controla tu **peso** y recibe **recomendaciones de carga** según tu peso, altura, edad y sexo.

## Funcionalidades
- 🏋️ Rutinas predefinidas + constructor de rutinas propias (series, reps/tiempo, descanso).
- ⏱️ Cada rutina tiene duración estimada y reproductor con temporizador, pitidos y vibración.
- 🟢🟡🔴 Niveles: principiante / intermedio / avanzado.
- 📏 Medidas + cálculo de IMC con clasificación.
- 🎯 Objetivo de peso con barra de progreso.
- ⏰ Recordatorio de pesaje configurable; métricas recalculadas automáticamente.
- 🏷️ Peso manual en kg o recomendación estimada por ejercicio.
- 📈 Gráfica de evolución del peso con línea de meta.
- 📲 Mobile-first, responsive, funciona offline (PWA) e instalable en el móvil.

Tus datos se guardan **solo en tu dispositivo** (localStorage). Puedes exportarlos/importarlos en JSON.

## Uso local
```bash
node server.js   # abre http://localhost:5173
```
O simplemente abre `index.html` en el navegador.

## Instalar en el móvil
Abre la web publicada en el navegador del móvil → menú → **"Añadir a pantalla de inicio"**.

## Tecnología
HTML + CSS + JavaScript vanilla. Sin dependencias ni build. Service worker para uso offline.

---
*Las recomendaciones de peso son orientativas, no constituyen consejo médico.*
