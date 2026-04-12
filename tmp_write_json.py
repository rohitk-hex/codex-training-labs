from pathlib import Path
content = '''{
   name: prompt-engineering-api-frontend,
  version: 1.0.0,
  private: true,
  scripts: {
    dev: vite,
    build: vite build,
    preview: vite preview
  },
  dependencies: {
    react: ^18.3.0,
    react-dom: ^18.3.0
  },
  devDependencies: {
    @vitejs/plugin-react: ^4.0.0,
    vite: ^5.5.0
  }
}'''
Path('modules/module-02-prompt-engineering-for-code/labs/prompt-engineering-api/frontend/package.json').write_text(content, encoding='utf-8')
