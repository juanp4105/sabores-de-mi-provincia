# Cómo instalar y usar la skill «Sabores de mi provincia»

## 1. Instalar
1. Cree una carpeta vacía para el proyecto, por ejemplo `sabores-de-mi-provincia`.
2. Dentro de ella, cree la ruta `.claude/skills/` (la carpeta `.claude` empieza con punto y puede estar oculta en su explorador de archivos).
3. Copie la carpeta `sabores-de-mi-provincia` de este paquete dentro de `.claude/skills/`. Debe quedar así:

```
sabores-de-mi-provincia/            ← carpeta del proyecto
└── .claude/
    └── skills/
        └── sabores-de-mi-provincia/
            ├── SKILL.md
            ├── references/
            └── assets/
```

4. Abra Claude Code en la carpeta del proyecto. La skill se carga sola; también puede llamarla escribiendo `/sabores-de-mi-provincia`.

## 2. Primer mensaje sugerido para Claude Code

> /sabores-de-mi-provincia Empecemos la etapa 0. No sé programar: explícame cada paso en lenguaje sencillo, muéstrame el resultado en el navegador y pídeme confirmación antes de publicar o borrar algo.

## 3. En cada sesión siguiente

> /sabores-de-mi-provincia Revisa la bitácora y continuemos con la siguiente tarea del cronograma.

## 4. Cuando tenga recetas reales
Entregue a Claude Code el texto de la entrevista o la referencia bibliográfica de cada receta, junto con la ficha de validación si ya la tiene:

> Aquí está la receta del repe lojano que me dio [nombre], de [comunidad], con su consentimiento. Cárgala en el sitio y marca su validación como pendiente.
