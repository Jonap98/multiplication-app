// import { yarg } from "./args.plugin";

const runCommand = async( args: string[] ) => {
    process.argv = [ ...process.argv, ...args];

    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('Should return default values', async() => {

        const argv = await runCommand(['-b', '5']);

        expect( argv ).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));

    });

    test('Should return configuration with custom values', async() => {

        const customValues = {
            b: 3,
            l: 20,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }

        const argv = await runCommand(['-b', '5', '-l', '10', '-s', '-n', 'custom-name', '-d', 'custom-dir']);
        // expect( argv ).toEqual( expect.objectContaining( customValues ));
    })
});