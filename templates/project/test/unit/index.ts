describe('package.json', () => {
	it('contains expected package name', () => {
		const manifest = require('../../../package.json');

		expect(manifest.name).toStrictEqual('@burninggarden/PROJECT_PLACEHOLDER');
	});
});
