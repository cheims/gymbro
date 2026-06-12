/* ============================================================
   GymBro · App de gimnasio personal (PWA offline)
   Datos en localStorage. Sin servidor.
   ============================================================ */

'use strict';

/* ---------------- Biblioteca de ejercicios ----------------
   type: 'reps' (por repeticiones) | 'time' (por tiempo)
   usesWeight: admite carga en kg
   coef: fracción del peso corporal para estimar carga (baseline hombre/intermedio)
*/
const EXERCISES = [
  // Pecho
  { id: 'press_banca', name: 'Press de banca', emoji: '🏋️', group: 'Pecho', type: 'reps', usesWeight: true, coef: 0.6, sets: 4, reps: 10, rest: 75, desc: 'Empuja la barra desde el pecho con control.' },
  { id: 'press_mancuernas', name: 'Press con mancuernas', emoji: '💪', group: 'Pecho', type: 'reps', usesWeight: true, coef: 0.25, sets: 3, reps: 12, rest: 60, desc: 'Press inclinado o plano con mancuernas.' },
  { id: 'flexiones', name: 'Flexiones', emoji: '🤸', group: 'Pecho', type: 'reps', usesWeight: false, sets: 3, reps: 15, rest: 45, desc: 'Cuerpo recto, baja hasta casi tocar el suelo.' },
  { id: 'aperturas', name: 'Aperturas', emoji: '🦅', group: 'Pecho', type: 'reps', usesWeight: true, coef: 0.12, sets: 3, reps: 12, rest: 50, desc: 'Abre los brazos en arco, aprieta el pecho.' },

  // Espalda
  { id: 'dominadas', name: 'Dominadas', emoji: '🧗', group: 'Espalda', type: 'reps', usesWeight: false, sets: 4, reps: 8, rest: 90, desc: 'Tira hasta pasar la barbilla la barra.' },
  { id: 'remo_barra', name: 'Remo con barra', emoji: '🚣', group: 'Espalda', type: 'reps', usesWeight: true, coef: 0.55, sets: 4, reps: 10, rest: 75, desc: 'Tronco inclinado, lleva la barra al abdomen.' },
  { id: 'jalon', name: 'Jalón al pecho', emoji: '🔽', group: 'Espalda', type: 'reps', usesWeight: true, coef: 0.5, sets: 3, reps: 12, rest: 60, desc: 'Polea alta, baja hasta el pecho.' },
  { id: 'peso_muerto', name: 'Peso muerto', emoji: '⚙️', group: 'Espalda', type: 'reps', usesWeight: true, coef: 1.0, sets: 4, reps: 6, rest: 120, desc: 'Espalda recta, levanta desde el suelo con piernas.' },

  // Piernas
  { id: 'sentadilla', name: 'Sentadilla', emoji: '🦵', group: 'Piernas', type: 'reps', usesWeight: true, coef: 0.85, sets: 4, reps: 10, rest: 90, desc: 'Baja con la espalda recta hasta 90º.' },
  { id: 'prensa', name: 'Prensa de piernas', emoji: '🦿', group: 'Piernas', type: 'reps', usesWeight: true, coef: 1.6, sets: 4, reps: 12, rest: 75, desc: 'Empuja la plataforma sin bloquear rodillas.' },
  { id: 'zancadas', name: 'Zancadas', emoji: '🚶', group: 'Piernas', type: 'reps', usesWeight: true, coef: 0.2, sets: 3, reps: 12, rest: 60, desc: 'Paso largo, baja la rodilla trasera.' },
  { id: 'gemelos', name: 'Elevación de gemelos', emoji: '🦶', group: 'Piernas', type: 'reps', usesWeight: true, coef: 0.5, sets: 4, reps: 18, rest: 45, desc: 'Sube sobre las puntas, aprieta arriba.' },
  { id: 'sentadilla_libre', name: 'Sentadilla sin peso', emoji: '🪑', group: 'Piernas', type: 'reps', usesWeight: false, sets: 3, reps: 20, rest: 40, desc: 'Sentadilla con peso corporal.' },

  // Hombros / brazos
  { id: 'press_militar', name: 'Press militar', emoji: '🎖️', group: 'Hombros', type: 'reps', usesWeight: true, coef: 0.4, sets: 4, reps: 10, rest: 75, desc: 'Empuja la barra por encima de la cabeza.' },
  { id: 'elevaciones_laterales', name: 'Elevaciones laterales', emoji: '↔️', group: 'Hombros', type: 'reps', usesWeight: true, coef: 0.08, sets: 3, reps: 14, rest: 45, desc: 'Sube las mancuernas hasta la horizontal.' },
  { id: 'curl_biceps', name: 'Curl de bíceps', emoji: '💪', group: 'Brazos', type: 'reps', usesWeight: true, coef: 0.18, sets: 3, reps: 12, rest: 50, desc: 'Flexiona el codo sin balancear.' },
  { id: 'triceps_polea', name: 'Tríceps en polea', emoji: '🔻', group: 'Brazos', type: 'reps', usesWeight: true, coef: 0.22, sets: 3, reps: 12, rest: 50, desc: 'Extiende los codos hacia abajo.' },
  { id: 'fondos', name: 'Fondos de tríceps', emoji: '🪑', group: 'Brazos', type: 'reps', usesWeight: false, sets: 3, reps: 12, rest: 50, desc: 'Baja flexionando los codos en banco/paralelas.' },

  // Core / cardio (por tiempo)
  { id: 'plancha', name: 'Plancha', emoji: '🧘', group: 'Core', type: 'time', usesWeight: false, sets: 3, duration: 40, rest: 30, desc: 'Mantén el cuerpo recto sobre antebrazos.' },
  { id: 'mountain_climbers', name: 'Escaladores', emoji: '⛰️', group: 'Core', type: 'time', usesWeight: false, sets: 3, duration: 40, rest: 25, desc: 'Lleva las rodillas al pecho alternando, rápido.' },
  { id: 'crunch', name: 'Crunch abdominal', emoji: '🔄', group: 'Core', type: 'reps', usesWeight: false, sets: 3, reps: 20, rest: 30, desc: 'Sube los hombros contrayendo el abdomen.' },
  { id: 'burpees', name: 'Burpees', emoji: '🔥', group: 'Cardio', type: 'time', usesWeight: false, sets: 4, duration: 40, rest: 30, desc: 'Flexión + salto explosivo. Ritmo constante.' },
  { id: 'jumping_jacks', name: 'Jumping jacks', emoji: '🤾', group: 'Cardio', type: 'time', usesWeight: false, sets: 3, duration: 45, rest: 20, desc: 'Salta abriendo brazos y piernas.' },
  { id: 'saltar_cuerda', name: 'Saltar la cuerda', emoji: '🪢', group: 'Cardio', type: 'time', usesWeight: false, sets: 4, duration: 60, rest: 30, desc: 'Saltos continuos a buen ritmo.' },
  { id: 'sprint', name: 'Sprint / carrera', emoji: '🏃', group: 'Cardio', type: 'time', usesWeight: false, sets: 5, duration: 30, rest: 60, desc: 'Carrera a alta intensidad, luego recupera.' },
];

const EX_MAP = Object.fromEntries(EXERCISES.map(e => [e.id, e]));

/* ---------------- Rutinas predefinidas ----------------
   Cada ejercicio puede sobreescribir sets/reps/duration/rest.
*/
const TEMPLATES = [
  {
    id: 'full_principiante', name: 'Cuerpo completo express', emoji: '🌱', level: 'principiante', goal: 'Tonificar',
    exercises: [
      { exId: 'sentadilla_libre', sets: 3, reps: 15, rest: 40 },
      { exId: 'flexiones', sets: 3, reps: 10, rest: 40 },
      { exId: 'jumping_jacks', sets: 3, duration: 40, rest: 20 },
      { exId: 'plancha', sets: 3, duration: 30, rest: 30 },
      { exId: 'crunch', sets: 3, reps: 15, rest: 30 },
    ]
  },
  {
    id: 'hiit_quema', name: 'HIIT quema grasa', emoji: '🔥', level: 'intermedio', goal: 'Perder peso',
    exercises: [
      { exId: 'burpees', sets: 4, duration: 35, rest: 25 },
      { exId: 'mountain_climbers', sets: 4, duration: 40, rest: 20 },
      { exId: 'jumping_jacks', sets: 4, duration: 45, rest: 20 },
      { exId: 'saltar_cuerda', sets: 3, duration: 50, rest: 25 },
      { exId: 'plancha', sets: 3, duration: 45, rest: 25 },
    ]
  },
  {
    id: 'fuerza_tren_superior', name: 'Fuerza tren superior', emoji: '💪', level: 'intermedio', goal: 'Ganar músculo',
    exercises: [
      { exId: 'press_banca', sets: 4, reps: 10, rest: 75 },
      { exId: 'remo_barra', sets: 4, reps: 10, rest: 75 },
      { exId: 'press_militar', sets: 3, reps: 10, rest: 70 },
      { exId: 'curl_biceps', sets: 3, reps: 12, rest: 50 },
      { exId: 'triceps_polea', sets: 3, reps: 12, rest: 50 },
    ]
  },
  {
    id: 'piernas_gluteo', name: 'Piernas y glúteo', emoji: '🦵', level: 'intermedio', goal: 'Ganar músculo',
    exercises: [
      { exId: 'sentadilla', sets: 4, reps: 10, rest: 90 },
      { exId: 'prensa', sets: 4, reps: 12, rest: 75 },
      { exId: 'zancadas', sets: 3, reps: 12, rest: 60 },
      { exId: 'gemelos', sets: 4, reps: 18, rest: 45 },
    ]
  },
  {
    id: 'full_avanzado', name: 'Full body fuerza', emoji: '🏆', level: 'avanzado', goal: 'Ganar músculo',
    exercises: [
      { exId: 'peso_muerto', sets: 4, reps: 6, rest: 120 },
      { exId: 'sentadilla', sets: 4, reps: 8, rest: 100 },
      { exId: 'press_banca', sets: 4, reps: 8, rest: 90 },
      { exId: 'dominadas', sets: 4, reps: 8, rest: 90 },
      { exId: 'press_militar', sets: 3, reps: 8, rest: 75 },
    ]
  },
  {
    id: 'core_express', name: 'Core en 15 min', emoji: '🧘', level: 'principiante', goal: 'Tonificar',
    exercises: [
      { exId: 'plancha', sets: 3, duration: 40, rest: 25 },
      { exId: 'crunch', sets: 3, reps: 20, rest: 25 },
      { exId: 'mountain_climbers', sets: 3, duration: 35, rest: 25 },
    ]
  },
];

/* ---------------- Estado ---------------- */
const STORE_KEY = 'gymbro_state_v1';
let state = null;

function defaultState() {
  return {
    profile: null,
    weights: [],            // { date:'YYYY-MM-DD', kg:Number }
    customRoutines: [],
    settings: { reminderDays: 7, lastWeighIn: null },
    history: [],            // { routineId, name, date, durationSec }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    state = raw ? JSON.parse(raw) : defaultState();
  } catch (e) { state = defaultState(); }
  if (!state.settings) state.settings = { reminderDays: 7, lastWeighIn: null };
  if (!state.weights) state.weights = [];
  if (!state.customRoutines) state.customRoutines = [];
  if (!state.history) state.history = [];
}
function saveState() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

/* ---------------- Utilidades ---------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const todayISO = () => new Date().toISOString().slice(0, 10);
function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}
function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function currentWeight() {
  if (state.weights.length) return state.weights[state.weights.length - 1].kg;
  return state.profile ? state.profile.weight : 0;
}
function startWeight() {
  if (state.weights.length) return state.weights[0].kg;
  return state.profile ? state.profile.weight : 0;
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2200);
}

/* ---------------- Cálculos ---------------- */
function calcBMI(kg, heightCm) {
  const h = heightCm / 100;
  return kg / (h * h);
}
function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Bajo peso', pill: 'pill-blue', pct: (bmi / 40) * 100 };
  if (bmi < 25) return { label: 'Peso normal', pill: 'pill-green', pct: (bmi / 40) * 100 };
  if (bmi < 30) return { label: 'Sobrepeso', pill: 'pill-yellow', pct: (bmi / 40) * 100 };
  return { label: 'Obesidad', pill: 'pill-red', pct: Math.min(100, (bmi / 40) * 100) };
}
function roundWeight(kg) {
  const step = kg < 12 ? 1 : 2.5;
  return Math.max(step, Math.round(kg / step) * step);
}
// Recomendación de carga según peso corporal, sexo, edad y nivel
function recommendWeight(ex, level) {
  if (!ex.coef) return null;
  const bw = currentWeight();
  if (!bw) return null;
  const lvlF = { principiante: 0.7, intermedio: 1.0, avanzado: 1.3 }[level] || 1.0;
  const sexF = state.profile.sex === 'mujer' ? 0.65 : 1.0;
  const age = state.profile.age || 30;
  const ageF = age <= 30 ? 1.0 : Math.max(0.7, 1 - (age - 30) * 0.006);
  return roundWeight(bw * ex.coef * lvlF * sexF * ageF);
}

/* Resuelve una rutina (plantilla o custom) a su forma completa */
function resolveRoutine(r) {
  return {
    ...r,
    items: r.exercises.map(it => {
      const base = EX_MAP[it.exId];
      return {
        ...base,
        sets: it.sets ?? base.sets,
        reps: it.reps ?? base.reps,
        duration: it.duration ?? base.duration,
        rest: it.rest ?? base.rest,
        manualWeight: it.weight ?? null,
      };
    })
  };
}
function allRoutines() { return [...TEMPLATES, ...state.customRoutines]; }
function getRoutine(id) { return allRoutines().find(r => r.id === id); }

// Tiempo estimado total de la rutina (segundos)
function routineDuration(r) {
  const res = resolveRoutine(r);
  let s = 8; // preparación
  res.items.forEach(it => {
    const workPerSet = it.type === 'time' ? it.duration : Math.max(25, it.reps * 3);
    s += it.sets * workPerSet + (it.sets) * it.rest;
  });
  return s;
}
function fmtDuration(sec) {
  const m = Math.round(sec / 60);
  return m + ' min';
}
function fmtClock(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return (m > 0 ? m + ':' + String(s).padStart(2, '0') : s + 's');
}

/* ============================================================
   ONBOARDING
   ============================================================ */
function showOnboarding() {
  $('#onboarding').classList.remove('hidden');
  $('#app').classList.add('hidden');
  $('#onboardingForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    state.profile = {
      name: f.name.value.trim(),
      sex: f.sex.value,
      age: +f.age.value,
      height: +f.height.value,
      weight: +f.weight.value,
      goalWeight: +f.goalWeight.value,
      createdAt: todayISO(),
    };
    state.weights = [{ date: todayISO(), kg: +f.weight.value }];
    state.settings.lastWeighIn = todayISO();
    saveState();
    $('#onboarding').classList.add('hidden');
    startApp();
  }, { once: true });
}

/* ============================================================
   APP / ROUTER
   ============================================================ */
let currentView = 'home';

function startApp() {
  $('#app').classList.remove('hidden');
  $$('.tab').forEach(t => t.addEventListener('click', () => setView(t.dataset.view)));
  $('#reminderBadge').addEventListener('click', () => openWeighIn());
  setView('home');
  checkReminder();
}

function setView(name) {
  currentView = name;
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
  render();
  $('#view').scrollTop = 0;
  window.scrollTo(0, 0);
}

function render() {
  const v = $('#view');
  if (currentView === 'home') v.innerHTML = renderHome();
  else if (currentView === 'routines') v.innerHTML = renderRoutines();
  else if (currentView === 'progress') v.innerHTML = renderProgress();
  else if (currentView === 'profile') v.innerHTML = renderProfile();
  bindView();
}

/* ---------------- Recordatorio de pesaje ---------------- */
function checkReminder() {
  const last = state.settings.lastWeighIn;
  const due = !last || daysBetween(last, todayISO()) >= state.settings.reminderDays;
  $('#reminderBadge').classList.toggle('hidden', !due);
}

/* ============================================================
   VISTA: INICIO (Dashboard)
   ============================================================ */
function renderHome() {
  const p = state.profile;
  const w = currentWeight();
  const bmi = calcBMI(w, p.height);
  const cat = bmiCategory(bmi);
  const goalDiff = +(w - p.goalWeight).toFixed(1);
  const start = startWeight();
  const totalToLose = start - p.goalWeight;
  const done = start - w;
  const goalPct = totalToLose === 0 ? 100 : Math.max(0, Math.min(100, (done / totalToLose) * 100));
  const goalText = Math.abs(goalDiff) < 0.1 ? '¡Objetivo alcanzado! 🎉'
    : (goalDiff > 0 ? `Te faltan ${Math.abs(goalDiff)} kg para tu meta` : `Estás ${Math.abs(goalDiff)} kg por debajo de tu meta`);

  // sugerencia de rutina
  const lastHist = state.history[state.history.length - 1];
  const suggestion = TEMPLATES.find(t => t.level === suggestedLevel()) || TEMPLATES[0];

  const lastWeighDays = state.settings.lastWeighIn ? daysBetween(state.settings.lastWeighIn, todayISO()) : null;

  return `
    <div class="hero">
      <div class="muted">${greeting()},</div>
      <div class="hello">${escapeHtml(p.name)} 👋</div>
    </div>

    <div class="card">
      <div class="card-head">
        <h2>Tu IMC</h2>
        <span class="pill ${cat.pill}">${cat.label}</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:.5rem;">
        <div style="font-size:2.4rem;font-weight:800;">${bmi.toFixed(1)}</div>
        <div class="muted">kg/m² · ${w} kg · ${p.height} cm</div>
      </div>
      <div class="imc-bar"><span class="needle" style="left:${Math.min(100, Math.max(0, cat.pct))}%"></span></div>
      <div class="muted" style="font-size:.72rem;display:flex;justify-content:space-between;">
        <span>Bajo</span><span>Normal</span><span>Sobrepeso</span><span>Obesidad</span>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <h2>Objetivo de peso</h2>
        <button class="btn btn-sm" data-act="weighin">+ Pesaje</button>
      </div>
      <div class="stat-grid" style="margin-bottom:.8rem;">
        <div class="stat"><div class="k">Actual</div><div class="v">${w}<span style="font-size:.9rem;"> kg</span></div></div>
        <div class="stat"><div class="k">Meta</div><div class="v">${p.goalWeight}<span style="font-size:.9rem;"> kg</span></div></div>
      </div>
      <div class="progress"><span style="width:${goalPct}%"></span></div>
      <div class="muted" style="margin-top:.5rem;font-size:.85rem;">${goalText}</div>
      ${lastWeighDays !== null ? `<div class="muted" style="font-size:.75rem;margin-top:.3rem;">Último pesaje hace ${lastWeighDays === 0 ? 'hoy' : lastWeighDays + ' día(s)'} · recordatorio cada ${state.settings.reminderDays} días</div>` : ''}
    </div>

    <div class="section-title">Rutina sugerida para ti</div>
    ${routineCardHTML(suggestion)}

    <div class="stat-grid">
      <div class="stat"><div class="k">Entrenos</div><div class="v">${state.history.length}</div><div class="s">completados</div></div>
      <div class="stat"><div class="k">Esta semana</div><div class="v">${workoutsThisWeek()}</div><div class="s">sesiones</div></div>
    </div>
  `;
}
function greeting() {
  const h = new Date().getHours();
  if (h < 6) return 'Buenas noches';
  if (h < 13) return 'Buenos días';
  if (h < 21) return 'Buenas tardes';
  return 'Buenas noches';
}
function suggestedLevel() {
  const n = state.history.length;
  if (n < 5) return 'principiante';
  if (n < 20) return 'intermedio';
  return 'avanzado';
}
function workoutsThisWeek() {
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  return state.history.filter(h => h.date >= weekAgo).length;
}

/* ============================================================
   VISTA: RUTINAS
   ============================================================ */
let routineFilter = 'todos';
function renderRoutines() {
  const levels = ['todos', 'principiante', 'intermedio', 'avanzado'];
  const list = allRoutines().filter(r => routineFilter === 'todos' || r.level === routineFilter);
  const customs = list.filter(r => r.custom);
  const presets = list.filter(r => !r.custom);

  return `
    <h1>Rutinas</h1>
    <div class="chip-row">
      ${levels.map(l => `<button class="chip ${routineFilter === l ? 'active' : ''}" data-filter="${l}">${l === 'todos' ? 'Todas' : capitalize(l)}</button>`).join('')}
    </div>

    ${customs.length ? `<div class="section-title">Mis rutinas</div>${customs.map(routineCardHTML).join('')}` : ''}

    <div class="section-title">Predefinidas</div>
    ${presets.map(routineCardHTML).join('') || '<div class="empty">No hay rutinas para este nivel.</div>'}

    <button class="fab" data-act="new-routine" title="Crear rutina">＋</button>
  `;
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function routineCardHTML(r) {
  const dur = routineDuration(r);
  const nEx = r.exercises.length;
  return `
    <div class="routine-card" data-routine="${r.id}">
      <div class="routine-emoji">${r.emoji || '🏋️'}</div>
      <div class="routine-info">
        <div class="t">${escapeHtml(r.name)}</div>
        <div class="m">
          <span class="level-badge lvl-${r.level}">${capitalize(r.level)}</span>
          <span>⏱️ ${fmtDuration(dur)}</span>
          <span>🔁 ${nEx} ejercicios</span>
          ${r.goal ? `<span>🎯 ${r.goal}</span>` : ''}
        </div>
      </div>
      <div style="color:var(--muted);font-size:1.3rem;">›</div>
    </div>`;
}

/* ---------------- Detalle de rutina ---------------- */
function openRoutine(id) {
  const r = getRoutine(id);
  if (!r) return;
  const res = resolveRoutine(r);
  const dur = routineDuration(r);
  const v = $('#view');
  v.innerHTML = `
    <button class="btn btn-ghost btn-sm" data-act="back" style="margin-bottom:.6rem;">‹ Volver</button>
    <div class="card">
      <div style="display:flex;align-items:center;gap:.8rem;">
        <div class="routine-emoji" style="width:56px;height:56px;font-size:2rem;">${r.emoji || '🏋️'}</div>
        <div style="flex:1;">
          <h1 style="margin:0;">${escapeHtml(r.name)}</h1>
          <div class="m" style="display:flex;gap:.6rem;flex-wrap:wrap;font-size:.8rem;color:var(--muted);margin-top:.3rem;">
            <span class="level-badge lvl-${r.level}">${capitalize(r.level)}</span>
            <span>⏱️ ${fmtDuration(dur)}</span>
            <span>🔁 ${res.items.length} ejercicios</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Ejercicios</h2>
      ${res.items.map((it, i) => {
        const rec = it.manualWeight ?? recommendWeight(it, r.level);
        const target = it.type === 'time' ? `${it.duration}s` : `${it.reps} reps`;
        const wTxt = it.usesWeight
          ? `<div class="ex-weight">${it.manualWeight ? '🏷️ ' + it.manualWeight + ' kg' : (rec ? '≈ ' + rec + ' kg' : '')}</div>`
          : '';
        return `
          <div class="ex-item">
            <div class="ex-num">${i + 1}</div>
            <div class="ex-body">
              <div class="n">${it.emoji} ${escapeHtml(it.name)}</div>
              <div class="d">${it.sets} series × ${target} · descanso ${it.rest}s</div>
            </div>
            ${wTxt}
          </div>`;
      }).join('')}
    </div>

    <div class="row-btns" style="position:sticky;bottom:calc(86px + var(--safe-bottom));">
      <button class="btn btn-primary btn-lg" data-act="start" data-routine="${r.id}" style="flex:2;">▶ Empezar (${fmtDuration(dur)})</button>
      ${r.custom ? `<button class="btn" data-act="edit-routine" data-routine="${r.id}">✏️</button>
                    <button class="btn btn-danger" data-act="del-routine" data-routine="${r.id}">🗑️</button>` : `<button class="btn" data-act="clone-routine" data-routine="${r.id}">📋 Copiar</button>`}
    </div>
    <p class="muted" style="font-size:.74rem;text-align:center;margin-top:.6rem;">Los pesos marcados con ≈ son recomendaciones estimadas según tu peso, edad, sexo y nivel. Ajústalos a tu sensación real.</p>
  `;
  bindView();
}

/* ============================================================
   CONSTRUCTOR DE RUTINAS
   ============================================================ */
let builderDraft = null;
function openBuilder(existingId) {
  if (existingId) {
    const r = state.customRoutines.find(x => x.id === existingId);
    builderDraft = JSON.parse(JSON.stringify(r));
  } else {
    builderDraft = { id: 'custom_' + Date.now(), name: '', emoji: '🔥', level: 'intermedio', goal: '', custom: true, exercises: [] };
  }
  renderBuilder();
}
function renderBuilder() {
  const d = builderDraft;
  const v = $('#view');
  v.innerHTML = `
    <button class="btn btn-ghost btn-sm" data-act="back" style="margin-bottom:.6rem;">‹ Cancelar</button>
    <h1>${d.exercises.length || d.name ? 'Editar rutina' : 'Nueva rutina'}</h1>
    <div class="card form">
      <label>Nombre de la rutina
        <input type="text" id="b-name" value="${escapeHtml(d.name)}" placeholder="Ej. Mi día de pecho" />
      </label>
      <div class="grid-2">
        <label>Nivel
          <select id="b-level">
            ${['principiante', 'intermedio', 'avanzado'].map(l => `<option value="${l}" ${d.level === l ? 'selected' : ''}>${capitalize(l)}</option>`).join('')}
          </select>
        </label>
        <label>Emoji
          <input type="text" id="b-emoji" value="${d.emoji}" maxlength="2" />
        </label>
      </div>
      <label>Objetivo (opcional)
        <input type="text" id="b-goal" value="${escapeHtml(d.goal || '')}" placeholder="Ej. Ganar músculo" />
      </label>
    </div>

    <div class="card-head"><h2 style="margin:0;">Ejercicios (${d.exercises.length})</h2>
      <button class="btn btn-sm btn-primary" data-act="add-ex">+ Añadir</button>
    </div>
    <div id="builder-list">
      ${d.exercises.length ? d.exercises.map((it, i) => builderExHTML(it, i)).join('') : '<div class="empty">Aún no has añadido ejercicios.</div>'}
    </div>

    <button class="btn btn-accent btn-block btn-lg" data-act="save-routine" style="margin-top:1rem;">💾 Guardar rutina</button>
  `;
  bindView();
}
function builderExHTML(it, i) {
  const ex = EX_MAP[it.exId];
  if (!ex) return '';
  const target = ex.type === 'time' ? `${it.duration ?? ex.duration}s` : `${it.reps ?? ex.reps} reps`;
  return `
    <div class="builder-ex">
      <div class="bx-info">
        <div class="n">${ex.emoji} ${escapeHtml(ex.name)}</div>
        <div class="d">${it.sets ?? ex.sets} series × ${target} · desc ${it.rest ?? ex.rest}s${ex.usesWeight && it.weight ? ' · 🏷️ ' + it.weight + ' kg' : ''}</div>
      </div>
      <button class="icon-btn" data-act="cfg-ex" data-i="${i}">⚙️</button>
      <button class="icon-btn" data-act="up-ex" data-i="${i}" ${i === 0 ? 'disabled style="opacity:.3"' : ''}>↑</button>
      <button class="icon-btn danger" data-act="rm-ex" data-i="${i}">✕</button>
    </div>`;
}

function openExercisePicker() {
  const groups = [...new Set(EXERCISES.map(e => e.group))];
  const body = groups.map(g => `
    <div class="section-title">${g}</div>
    ${EXERCISES.filter(e => e.group === g).map(e => `
      <div class="picker-item" data-pick="${e.id}">
        <span class="picker-emoji">${e.emoji}</span>
        <div style="flex:1;">
          <div style="font-weight:600;">${escapeHtml(e.name)}</div>
          <div class="muted" style="font-size:.76rem;">${e.type === 'time' ? 'Por tiempo' : 'Por repeticiones'}${e.usesWeight ? ' · con peso' : ''}</div>
        </div>
        <span style="color:var(--primary);font-size:1.3rem;">＋</span>
      </div>`).join('')}
  `).join('');
  openSheet('Elige un ejercicio', body, sheet => {
    $$('[data-pick]', sheet).forEach(el => el.addEventListener('click', () => {
      const ex = EX_MAP[el.dataset.pick];
      builderDraft.exercises.push({ exId: ex.id, sets: ex.sets, reps: ex.reps, duration: ex.duration, rest: ex.rest, weight: null });
      closeSheet();
      renderBuilder();
    }));
  });
}

function openExerciseConfig(i) {
  const it = builderDraft.exercises[i];
  const ex = EX_MAP[it.exId];
  const isTime = ex.type === 'time';
  const rec = ex.usesWeight ? recommendWeight(ex, builderDraft.level) : null;
  const body = `
    <div class="form">
      <div class="grid-2">
        <label>Series
          <input type="number" id="c-sets" value="${it.sets ?? ex.sets}" min="1" max="10" />
        </label>
        <label>${isTime ? 'Duración (s)' : 'Repeticiones'}
          <input type="number" id="c-target" value="${isTime ? (it.duration ?? ex.duration) : (it.reps ?? ex.reps)}" min="1" max="300" />
        </label>
      </div>
      <label>Descanso (s)
        <input type="number" id="c-rest" value="${it.rest ?? ex.rest}" min="0" max="300" />
      </label>
      ${ex.usesWeight ? `<label>Peso (kg) — déjalo vacío para usar la recomendación ${rec ? '≈ ' + rec + ' kg' : ''}
        <input type="number" id="c-weight" value="${it.weight ?? ''}" min="0" max="500" step="0.5" placeholder="${rec ? rec : 'kg'}" />
      </label>` : ''}
      <button class="btn btn-primary btn-block" id="c-save">Guardar</button>
    </div>`;
  openSheet(ex.emoji + ' ' + ex.name, body, sheet => {
    $('#c-save', sheet).addEventListener('click', () => {
      it.sets = +$('#c-sets', sheet).value;
      if (isTime) it.duration = +$('#c-target', sheet).value;
      else it.reps = +$('#c-target', sheet).value;
      it.rest = +$('#c-rest', sheet).value;
      if (ex.usesWeight) { const wv = $('#c-weight', sheet).value; it.weight = wv === '' ? null : +wv; }
      closeSheet();
      renderBuilder();
    });
  });
}

function saveRoutine() {
  const d = builderDraft;
  d.name = $('#b-name').value.trim() || 'Mi rutina';
  d.level = $('#b-level').value;
  d.emoji = $('#b-emoji').value || '🔥';
  d.goal = $('#b-goal').value.trim();
  if (!d.exercises.length) { toast('Añade al menos un ejercicio'); return; }
  const idx = state.customRoutines.findIndex(r => r.id === d.id);
  if (idx >= 0) state.customRoutines[idx] = d; else state.customRoutines.push(d);
  saveState();
  toast('Rutina guardada ✅');
  setView('routines');
}

/* ============================================================
   REPRODUCTOR DE ENTRENAMIENTO
   ============================================================ */
let player = null;
function startWorkout(id) {
  const r = getRoutine(id);
  if (!r) return;
  const res = resolveRoutine(r);
  // Construir secuencia de fases
  const seq = [{ phase: 'prep', dur: 8, label: 'Prepárate' }];
  res.items.forEach((it, ei) => {
    const rec = it.manualWeight ?? (it.usesWeight ? recommendWeight(it, r.level) : null);
    for (let s = 1; s <= it.sets; s++) {
      const workDur = it.type === 'time' ? it.duration : Math.max(25, it.reps * 3);
      seq.push({
        phase: 'work', dur: workDur, ex: it, exIndex: ei, set: s,
        target: it.type === 'time' ? `${it.duration}s` : `${it.reps} reps`,
        weight: rec, manual: !!it.manualWeight,
      });
      const isLast = (ei === res.items.length - 1) && (s === it.sets);
      if (!isLast) seq.push({ phase: 'rest', dur: it.rest, label: 'Descanso' });
    }
  });
  player = { routine: r, seq, idx: 0, remaining: seq[0].dur, paused: false, startedAt: Date.now(), timer: null };
  $('#player').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderPlayer();
  tickStart();
}
function tickStart() {
  clearInterval(player.timer);
  player.timer = setInterval(() => {
    if (player.paused) return;
    player.remaining--;
    if (player.remaining <= 0) { beep(player.seq[player.idx].phase === 'work' ? 'end' : 'go'); nextPhase(); }
    else { if (player.remaining <= 3) beep('tick'); updatePlayerTime(); }
  }, 1000);
}
function nextPhase() {
  if (player.idx >= player.seq.length - 1) { finishWorkout(); return; }
  player.idx++;
  player.remaining = player.seq[player.idx].dur;
  renderPlayer();
}
function prevPhase() {
  if (player.idx === 0) { player.remaining = player.seq[0].dur; renderPlayer(); return; }
  player.idx--;
  player.remaining = player.seq[player.idx].dur;
  renderPlayer();
}
function togglePause() { player.paused = !player.paused; renderPlayer(); }
function quitWorkout(saveIt) {
  clearInterval(player.timer);
  if (saveIt) registerWorkout();
  player = null;
  $('#player').classList.add('hidden');
  document.body.style.overflow = '';
  render();
}
function finishWorkout() {
  clearInterval(player.timer);
  registerWorkout();
  beep('finish');
  const elapsed = Math.round((Date.now() - player.startedAt) / 1000);
  $('#player').innerHTML = `
    <div class="player-main">
      <div style="font-size:4rem;">🎉</div>
      <div class="player-ex">¡Entreno completado!</div>
      <div class="player-sub">${escapeHtml(player.routine.name)} · ${fmtDuration(elapsed)}</div>
      <button class="btn btn-primary btn-lg" data-act="player-close" style="margin-top:1.4rem;min-width:200px;">Hecho</button>
    </div>`;
  $('[data-act="player-close"]', $('#player')).addEventListener('click', () => {
    player = null; $('#player').classList.add('hidden'); document.body.style.overflow = ''; setView('home');
  });
}
let workoutRegistered = false;
function registerWorkout() {
  if (workoutRegistered) return;
  workoutRegistered = true;
  const elapsed = Math.round((Date.now() - player.startedAt) / 1000);
  state.history.push({ routineId: player.routine.id, name: player.routine.name, date: todayISO(), durationSec: elapsed });
  saveState();
  setTimeout(() => { workoutRegistered = false; }, 100);
}

function renderPlayer() {
  const s = player.seq[player.idx];
  const total = player.seq.length;
  const progPct = ((player.idx) / (total - 1)) * 100;
  const next = player.seq[player.idx + 1];
  let nextLabel = '';
  if (next) nextLabel = next.phase === 'work' ? `Siguiente: ${next.ex.name} (serie ${next.set})` : (next.phase === 'rest' ? 'Siguiente: descanso' : '');

  let mid = '';
  if (s.phase === 'prep') {
    mid = `
      <div class="player-phase workphase-prep">Preparación</div>
      <div class="player-ex">¡Empezamos!</div>
      <div class="player-sub">${escapeHtml(player.routine.name)}</div>`;
  } else if (s.phase === 'work') {
    const wTxt = s.ex.usesWeight && s.weight ? `<div class="player-rec">Peso ${s.manual ? '' : 'recomendado'}: <b>${s.weight} kg</b></div>` : '';
    mid = `
      <div class="player-phase workphase-work">Serie ${s.set} de ${s.ex.sets}</div>
      <div class="player-ex">${s.ex.emoji} ${escapeHtml(s.ex.name)}</div>
      <div class="player-sub">Objetivo: ${s.target}</div>
      ${wTxt}`;
  } else {
    mid = `
      <div class="player-phase workphase-rest">Descanso</div>
      <div class="player-ex">😮‍💨 Recupera</div>
      <div class="player-sub">${nextLabel.replace('Siguiente: ', '')}</div>`;
  }

  $('#player').innerHTML = `
    <div class="player-top">
      <button class="x" data-act="player-quit">✕</button>
      <div class="muted" style="font-size:.85rem;">${player.idx + 1}/${total}</div>
      <div style="width:40px;"></div>
    </div>
    <div class="player-prog"><span style="width:${progPct}%"></span></div>
    <div class="player-main">
      ${mid}
      <div class="timer-ring">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--card-2)" stroke-width="10"/>
          <circle id="ring" cx="60" cy="60" r="52" fill="none" stroke="${s.phase === 'rest' ? 'var(--warn)' : (s.phase === 'prep' ? 'var(--primary)' : 'var(--accent)')}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${2 * Math.PI * 52}" stroke-dashoffset="0"/>
        </svg>
        <div class="time-text"><div class="big" id="time-big">${player.remaining}</div><div class="muted" style="font-size:.8rem;">seg</div></div>
      </div>
      <div class="player-controls">
        <button class="btn" data-act="player-prev">‹‹</button>
        <button class="btn btn-primary big-pause" data-act="player-pause">${player.paused ? '▶' : '❚❚'}</button>
        <button class="btn" data-act="player-next">››</button>
      </div>
      ${next ? `<div class="player-next">${escapeHtml(nextLabel)}</div>` : '<div class="player-next">¡Última fase!</div>'}
    </div>
  `;
  const pl = $('#player');
  $('[data-act="player-quit"]', pl).addEventListener('click', () => {
    if (confirm('¿Salir del entrenamiento? Se guardará el progreso parcial.')) quitWorkout(true);
  });
  $('[data-act="player-pause"]', pl).addEventListener('click', togglePause);
  $('[data-act="player-next"]', pl).addEventListener('click', () => { beep('go'); nextPhase(); });
  $('[data-act="player-prev"]', pl).addEventListener('click', prevPhase);
  updatePlayerTime();
}
function updatePlayerTime() {
  const big = $('#time-big'); if (!big) return;
  big.textContent = player.remaining;
  const s = player.seq[player.idx];
  const ring = $('#ring');
  if (ring) {
    const circ = 2 * Math.PI * 52;
    const frac = player.remaining / s.dur;
    ring.setAttribute('stroke-dashoffset', String(circ * (1 - frac)));
  }
}

/* Audio: pitidos */
let audioCtx;
function beep(kind) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    const map = { tick: 660, go: 880, end: 520, finish: 1040 };
    o.frequency.value = map[kind] || 700;
    o.type = 'sine';
    g.gain.setValueAtTime(0.001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (kind === 'finish' ? 0.5 : 0.18));
    o.start(); o.stop(audioCtx.currentTime + (kind === 'finish' ? 0.5 : 0.2));
    if (navigator.vibrate && kind !== 'tick') navigator.vibrate(kind === 'finish' ? [120, 60, 120] : 60);
  } catch (e) { /* sin audio */ }
}

/* ============================================================
   VISTA: PROGRESO
   ============================================================ */
function renderProgress() {
  const w = state.weights;
  const p = state.profile;
  const cur = currentWeight();
  const bmi = calcBMI(cur, p.height);
  const cat = bmiCategory(bmi);

  return `
    <h1>Progreso</h1>
    <div class="card">
      <div class="card-head"><h2>Evolución del peso</h2>
        <button class="btn btn-sm btn-primary" data-act="weighin">+ Pesaje</button>
      </div>
      ${w.length >= 2 ? `<div class="chart-wrap">${weightChartSVG()}</div>` : '<div class="empty" style="padding:1.5rem;">Registra al menos 2 pesajes para ver tu gráfica.</div>'}
      <div class="stat-grid" style="margin-top:.8rem;">
        <div class="stat"><div class="k">Inicio</div><div class="v">${startWeight()}<span style="font-size:.8rem;"> kg</span></div></div>
        <div class="stat"><div class="k">Actual</div><div class="v">${cur}<span style="font-size:.8rem;"> kg</span></div></div>
        <div class="stat"><div class="k">Meta</div><div class="v">${p.goalWeight}<span style="font-size:.8rem;"> kg</span></div></div>
        <div class="stat"><div class="k">Cambio</div><div class="v">${(cur - startWeight()).toFixed(1)}<span style="font-size:.8rem;"> kg</span></div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h2>IMC actual</h2><span class="pill ${cat.pill}">${cat.label}</span></div>
      <div style="font-size:1.8rem;font-weight:800;">${bmi.toFixed(1)} <span class="muted" style="font-size:.9rem;font-weight:400;">kg/m²</span></div>
    </div>

    <div class="card">
      <h2>Historial de pesajes</h2>
      ${w.length ? [...w].reverse().map((entry, i, arr) => {
        const prev = arr[i + 1];
        const delta = prev ? +(entry.kg - prev.kg).toFixed(1) : null;
        const deltaTxt = delta === null ? '' : (delta === 0 ? '<span class="muted" style="font-size:.78rem;">±0</span>' : `<span class="${delta > 0 ? 'delta-up' : 'delta-down'}">${delta > 0 ? '▲' : '▼'} ${Math.abs(delta)} kg</span>`);
        return `<div class="log-item">
          <div><div class="wt">${entry.kg} kg</div><div class="dt">${new Date(entry.date + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</div></div>
          ${deltaTxt}
        </div>`;
      }).join('') : '<div class="empty">Sin registros todavía.</div>'}
    </div>

    ${state.history.length ? `<div class="card"><h2>Entrenamientos recientes</h2>
      ${[...state.history].reverse().slice(0, 8).map(h => `<div class="log-item"><div><div class="wt">${escapeHtml(h.name)}</div><div class="dt">${fmtDate(h.date)} · ${fmtDuration(h.durationSec)}</div></div><span style="color:var(--accent);">✓</span></div>`).join('')}
    </div>` : ''}
  `;
}

function weightChartSVG() {
  const W = 320, H = 160, pad = 28;
  const pts = state.weights;
  const goal = state.profile.goalWeight;
  const vals = pts.map(p => p.kg).concat([goal]);
  let min = Math.min(...vals), max = Math.max(...vals);
  if (min === max) { min -= 1; max += 1; }
  const rng = max - min;
  min -= rng * 0.1; max += rng * 0.1;
  const x = i => pad + (i / (pts.length - 1)) * (W - pad * 2);
  const y = v => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.kg).toFixed(1)}`).join(' ');
  const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - pad} L${x(0).toFixed(1)},${H - pad} Z`;
  const goalY = y(goal).toFixed(1);
  return `
    <svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5b8cff" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#5b8cff" stop-opacity="0"/>
      </linearGradient></defs>
      <line x1="${pad}" y1="${goalY}" x2="${W - pad}" y2="${goalY}" stroke="#36d399" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="${W - pad}" y="${(+goalY - 4)}" fill="#36d399" font-size="9" text-anchor="end">meta ${goal}kg</text>
      <path d="${area}" fill="url(#g)"/>
      <path d="${line}" fill="none" stroke="#5b8cff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${pts.map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.kg).toFixed(1)}" r="3" fill="#5b8cff"/>`).join('')}
      <text x="${pad}" y="${H - 8}" fill="#9aa3b8" font-size="9">${fmtDate(pts[0].date)}</text>
      <text x="${W - pad}" y="${H - 8}" fill="#9aa3b8" font-size="9" text-anchor="end">${fmtDate(pts[pts.length - 1].date)}</text>
    </svg>`;
}

function openWeighIn() {
  const body = `
    <div class="form">
      <label>Peso de hoy (kg)
        <input type="number" id="wi-weight" value="${currentWeight()}" min="30" max="300" step="0.1" />
      </label>
      <label>Fecha
        <input type="date" id="wi-date" value="${todayISO()}" max="${todayISO()}" />
      </label>
      <button class="btn btn-primary btn-block" id="wi-save">Registrar pesaje</button>
    </div>`;
  openSheet('Nuevo pesaje', body, sheet => {
    $('#wi-save', sheet).addEventListener('click', () => {
      const kg = +$('#wi-weight', sheet).value;
      const date = $('#wi-date', sheet).value || todayISO();
      if (!kg || kg < 20) { toast('Peso no válido'); return; }
      const existing = state.weights.find(w => w.date === date);
      if (existing) existing.kg = kg;
      else state.weights.push({ date, kg });
      state.weights.sort((a, b) => a.date.localeCompare(b.date));
      state.profile.weight = currentWeight();
      state.settings.lastWeighIn = todayISO();
      saveState();
      closeSheet();
      checkReminder();
      toast('Pesaje registrado ✅');
      render();
    });
  });
}

/* ============================================================
   VISTA: PERFIL
   ============================================================ */
function renderProfile() {
  const p = state.profile;
  return `
    <h1>Perfil</h1>
    <div class="card">
      <div class="card-head"><h2>Mis datos</h2><button class="btn btn-sm" data-act="edit-profile">✏️ Editar</button></div>
      <div class="kv"><span class="k">Nombre</span><span>${escapeHtml(p.name)}</span></div>
      <div class="kv"><span class="k">Sexo</span><span>${capitalize(p.sex)}</span></div>
      <div class="kv"><span class="k">Edad</span><span>${p.age} años</span></div>
      <div class="kv"><span class="k">Altura</span><span>${p.height} cm</span></div>
      <div class="kv"><span class="k">Peso actual</span><span>${currentWeight()} kg</span></div>
      <div class="kv"><span class="k">Objetivo</span><span>${p.goalWeight} kg</span></div>
    </div>

    <div class="card">
      <div class="card-head"><h2>Recordatorio de pesaje</h2></div>
      <label>Avisarme cada
        <select id="reminder-days">
          ${[3, 7, 14, 30].map(d => `<option value="${d}" ${state.settings.reminderDays === d ? 'selected' : ''}>${d} días</option>`).join('')}
        </select>
      </label>
      <p class="muted" style="font-size:.78rem;margin:.5rem 0 0;">Te mostraremos un aviso en la barra superior cuando toque controlar tu peso y actualizar tus métricas.</p>
    </div>

    <div class="card">
      <h2>Datos</h2>
      <div class="row-btns" style="margin-bottom:.6rem;">
        <button class="btn btn-sm" data-act="export">⬇️ Exportar</button>
        <button class="btn btn-sm" data-act="import">⬆️ Importar</button>
      </div>
      <button class="btn btn-danger btn-block btn-sm" data-act="reset">🗑️ Borrar todos los datos</button>
    </div>
    <p class="muted center" style="font-size:.74rem;">GymBro · Tus datos se guardan solo en este dispositivo.<br/>Las recomendaciones de peso son orientativas, no consejo médico.</p>
  `;
}

function openProfileEditor() {
  const p = state.profile;
  const body = `
    <div class="form">
      <label>Nombre<input type="text" id="p-name" value="${escapeHtml(p.name)}" /></label>
      <div class="grid-2">
        <label>Sexo<select id="p-sex"><option value="hombre" ${p.sex === 'hombre' ? 'selected' : ''}>Hombre</option><option value="mujer" ${p.sex === 'mujer' ? 'selected' : ''}>Mujer</option></select></label>
        <label>Edad<input type="number" id="p-age" value="${p.age}" min="12" max="100" /></label>
      </div>
      <div class="grid-2">
        <label>Altura (cm)<input type="number" id="p-height" value="${p.height}" min="120" max="230" /></label>
        <label>Objetivo (kg)<input type="number" id="p-goal" value="${p.goalWeight}" min="30" max="300" step="0.1" /></label>
      </div>
      <button class="btn btn-primary btn-block" id="p-save">Guardar cambios</button>
    </div>`;
  openSheet('Editar perfil', body, sheet => {
    $('#p-save', sheet).addEventListener('click', () => {
      p.name = $('#p-name', sheet).value.trim() || p.name;
      p.sex = $('#p-sex', sheet).value;
      p.age = +$('#p-age', sheet).value;
      p.height = +$('#p-height', sheet).value;
      p.goalWeight = +$('#p-goal', sheet).value;
      saveState();
      closeSheet();
      toast('Perfil actualizado ✅');
      render();
    });
  });
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'gymbro-datos-' + todayISO() + '.json';
  a.click(); URL.revokeObjectURL(url);
}
function importData() {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'application/json';
  inp.onchange = () => {
    const file = inp.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.profile) throw new Error('Formato no válido');
        state = data; saveState(); toast('Datos importados ✅'); render(); checkReminder();
      } catch (e) { toast('Archivo no válido'); }
    };
    reader.readAsText(file);
  };
  inp.click();
}

/* ============================================================
   BOTTOM SHEET (modal)
   ============================================================ */
function openSheet(title, bodyHTML, onMount) {
  closeSheet();
  const bd = document.createElement('div');
  bd.className = 'sheet-backdrop'; bd.id = 'sheet-backdrop';
  bd.innerHTML = `<div class="sheet"><div class="sheet-handle"></div><h2>${escapeHtml(title)}</h2><div class="sheet-body"></div></div>`;
  document.body.appendChild(bd);
  $('.sheet-body', bd).innerHTML = bodyHTML;
  bd.addEventListener('click', e => { if (e.target === bd) closeSheet(); });
  if (onMount) onMount($('.sheet', bd));
}
function closeSheet() { const e = $('#sheet-backdrop'); if (e) e.remove(); }

/* ============================================================
   BINDING DE EVENTOS (delegación)
   ============================================================ */
function bindView() {
  const v = $('#view');

  // navegación a rutina
  $$('[data-routine]', v).forEach(el => {
    if (el.classList.contains('routine-card')) el.addEventListener('click', () => openRoutine(el.dataset.routine));
  });

  // chips de filtro
  $$('[data-filter]', v).forEach(el => el.addEventListener('click', () => { routineFilter = el.dataset.filter; render(); }));

  // acciones genéricas
  $$('[data-act]', v).forEach(el => {
    const act = el.dataset.act;
    el.addEventListener('click', e => {
      e.stopPropagation();
      switch (act) {
        case 'weighin': openWeighIn(); break;
        case 'back': setView(currentView); break;
        case 'start': startWorkout(el.dataset.routine); break;
        case 'new-routine': openBuilder(); break;
        case 'edit-routine': openBuilder(el.dataset.routine); break;
        case 'clone-routine': cloneRoutine(el.dataset.routine); break;
        case 'del-routine': delRoutine(el.dataset.routine); break;
        case 'add-ex': openExercisePicker(); break;
        case 'cfg-ex': openExerciseConfig(+el.dataset.i); break;
        case 'up-ex': moveEx(+el.dataset.i); break;
        case 'rm-ex': rmEx(+el.dataset.i); break;
        case 'save-routine': saveRoutine(); break;
        case 'edit-profile': openProfileEditor(); break;
        case 'export': exportData(); break;
        case 'import': importData(); break;
        case 'reset': resetAll(); break;
      }
    });
  });

  // selector de días de recordatorio
  const rd = $('#reminder-days', v);
  if (rd) rd.addEventListener('change', () => { state.settings.reminderDays = +rd.value; saveState(); checkReminder(); toast('Recordatorio actualizado'); });
}

function moveEx(i) { if (i <= 0) return; const a = builderDraft.exercises; [a[i - 1], a[i]] = [a[i], a[i - 1]]; renderBuilder(); }
function rmEx(i) { builderDraft.exercises.splice(i, 1); renderBuilder(); }
function cloneRoutine(id) {
  const r = getRoutine(id);
  const copy = JSON.parse(JSON.stringify(r));
  copy.id = 'custom_' + Date.now();
  copy.name = r.name + ' (copia)';
  copy.custom = true;
  state.customRoutines.push(copy);
  saveState();
  toast('Rutina copiada a "Mis rutinas" ✅');
  setView('routines');
}
function delRoutine(id) {
  if (!confirm('¿Eliminar esta rutina?')) return;
  state.customRoutines = state.customRoutines.filter(r => r.id !== id);
  saveState();
  toast('Rutina eliminada');
  setView('routines');
}
function resetAll() {
  if (!confirm('Esto borrará TODOS tus datos (perfil, pesajes, rutinas). ¿Continuar?')) return;
  localStorage.removeItem(STORE_KEY);
  state = defaultState();
  location.reload();
}

/* ============================================================
   ARRANQUE
   ============================================================ */
function boot() {
  loadState();
  if (!state.profile) showOnboarding();
  else startApp();
}
boot();

/* Service worker para uso offline */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
