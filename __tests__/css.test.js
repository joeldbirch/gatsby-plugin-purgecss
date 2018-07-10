const fs = require('fs-extra');

const dir = 'test_build';

describe('Verify Build', () => {
  test('node_modules exists', async () => {
    const exists = await fs.pathExists(dir + '/node_modules');

    expect(exists).toBeTruthy();
  });

  test('plugin exists', async () => {
    const exists = await fs.pathExists(dir + '/plugins/gatsby-plugin-purgecss');

    expect(exists).toBeTruthy();
  });

  test('project has a build', async () => {
    const exists = await fs.pathExists(dir + '/public');

    expect(exists).toBeTruthy();
  });

  test('index.html was generated', async () => {
    const exists = await fs.pathExists(dir + '/public/index.html');

    expect(exists).toBeTruthy();
  });
});

describe('Check purge status', async () => {
  let html;
  beforeAll(async () => {
    html = await fs.readFile(dir + '/public/index.html', 'utf-8');
  });
  describe('Works with direct css imports, (import "./file.css")', () => {
    test('Kept class selectors', async () => {
      expect(html).toContain('#global_ok');
    });
    test('Removed unused class selectors', async () => {
      expect(html).not.toContain('#global_no');
    });
  });

  describe('Works with css, (import style from "./file.css")', () => {
    test('Kept class selectors', async () => {
      expect(html).toContain('#css_ok');
    });
    test('Removed unused html tag selectors', async () => {
      expect(html).not.toContain('#css_no');
    });
  });

  describe('Works with css modules, (import style from "./file.module.css")', () => {
    test('Kept class selectors', async () => {
      expect(html).toContain('#css_module_ok');
    });
    test('Removed unused html tag selectors', async () => {
      expect(html).not.toContain('#css_module_no');
    });
  });

  describe('Works with stylus, (import style from "./file.styl")', () => {
    test('Kept class selectors', async () => {
      expect(html).toContain('#stylus_ok');

    });
    test('Removed unused class selectors', async () => {
      expect(html).not.toContain('#stylus_no');
    });
  });

  describe('Works with stylus modules, (import style from "./file.module.styl")', () => {
    test('Kept class selectors', async () => {
      expect(html).toContain('#stylus_module_ok');

    });
    test('Removed unused class selectors', async () => {
      expect(html).not.toContain('#stylus_module_no');
    });
  });
});
