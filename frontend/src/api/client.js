export const api = {
    async getTemplate(templateName) {
        const response = await fetch(`http://localhost:5000/api/templates/${templateName}`);
        return await response.json();
    },
    async getGallery() {
        const response = await fetch('http://localhost:5000/api/gallery');
        return await response.json();
    },
    async saveSite(name, structure) {
        const response = await fetch('http://localhost:5000/api/save/3', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, structure })
        });
        return await response.json();
    },
    async loadSite(id) {
        const response = await fetch(`http://localhost:5000/api/site/${id}`);
        return await response.json();
    }
};