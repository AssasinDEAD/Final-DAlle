// tests/postRoutes.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Предполагается, что ваш экземпляр приложения находится в файле app.js

chai.use(chaiHttp);

const { expect } = chai;

describe('Post Routes Tests', () => {
   it('should get all posts', async () => {
      const res = await chai.request(app).get('/api/v1/post');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success').to.be.true;
      expect(res.body).to.have.property('data').to.be.an('array');
   });

   it('should create a new post', async () => {
      const newPostData = {
         name: 'Test User',
         prompt: 'Test Prompt',
         photo: 'data:image/png;base64,iVBORw...'
      };

      const res = await chai.request(app).post('/api/v1/post').send(newPostData);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('success').to.be.true;
      expect(res.body).to.have.property('data').to.be.an('object');
      expect(res.body.data).to.have.property('name').to.equal(newPostData.name);
      // Add more assertions as needed
   });
});
