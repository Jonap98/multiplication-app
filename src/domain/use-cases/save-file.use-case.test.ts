import fs from "fs";
import { SaveFile } from "./save-file.use-case";

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    };
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        const exist = fs.existsSync('outputs')
        const customOptions = fs.existsSync('custom-outputs')
        if( exist )
            fs.rmSync('outputs', { recursive: true });
    
        if( customOptions )
            fs.rmSync('custom-outputs', { recursive: true });
    });

    test('Should save file with default values', () => {

        const saveFile = new SaveFile();
        const filepath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        };

        const result = saveFile.execute( options );
        const checkFile = fs.existsSync(filepath);
        const fileContet = fs.readFileSync(filepath, { encoding: 'utf-8' });
        
        expect( result ).toBe( true );
        expect( checkFile ).toBeTruthy();
        expect( fileContet ).toBe( options.fileContent );

    });

    test('Should save file with custom values', () => {
        
        const saveFile = new SaveFile();

        const result = saveFile.execute( customOptions );
        const fileExists = fs.existsSync( customFilePath );
        const fileContent = fs.readFileSync( customFilePath, { encoding: 'utf-8'} );

        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent );

        
    });

    test('Should return false if directory could not be created', () => {

        const saveFile = new SaveFile();

        // jest.spyOn crea un espia sobre mkdirSync
        // Con .mockImplementation se sobreescribe la funcionalidad del mkdir por la implementacion indicada
        // dentro, en este caso, la funcion que ejecuta el throw new error
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );

        const result = saveFile.execute( customOptions );

        expect( result ).toBe( false );

        mkdirSpy.mockRestore();
    });

    test('Should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from witing testing') }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe( false );

        writeFileSpy.mockRestore();
    });

});