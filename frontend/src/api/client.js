export const api = {
    async getTemplate(templateName) {
        const response = await fetch(`http://localhost:5000/api/templates/${templateName}`);
        return await response.json();
    },
    async getGallery() {
        const response = await fetch('http://localhost:5000/api/gallery');
        return await response.json();
    }
};