import '@testing-library/jest-dom'
import cloudinary from 'cloudinary'
import { fileUpload } from '../../helpers/fileUpload';


cloudinary.config({ 
    cloud_name: 'damdemxdk', 
    api_key: '111865517456616', 
    api_secret: 'vQw0PEowyZnLWhpjlDzSuFHuxJM' 
  });


describe('Pruebas en fileUpload', () => {

    test('Debe de cargar un archivo y retornar el url', async(done) => {

        const resp = await fetch(`https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg`);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg')
        
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length -1 ].replace('.jpg','');

        cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            done();
        });
    })

    test('Debe de retornar u error', async() => {


        const file = new File([], 'foto.png')
        
        const url = await fileUpload(file);

        expect(url).toBe(null)
    })
    
    
})
