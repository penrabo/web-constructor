export const BLOCK_TEMPLATES = {
    bricksCard: {
        "type": "div",
        "id": "newCard",
        "role": "bricks-item",
        "class": "bricks-item",
        "style": null,
        "content": null,
        "editable": true,
        "children": [
            {
                "type": "h4",
                "id": "newTitle",
                "role": "item-title",
                "class": "item-title",
                "style": null,
                "content": "Заголовок",
                "children": []
            },
            {
                "type": "p",
                "id": "newSubtitle",
                "role": "item-subtitle",
                "class": "item-subtitle",
                "style": null,
                "content": "Подзаголовок",
                "children": []
            },
            {
                "type": "p",
                "id": "newContent",
                "role": "item-content",
                "class": "item-content",
                "style": null,
                "content": "Текст текст текст",
                "children": []
            },
            {
                "type": "div",
                "id": "newImage",
                "role": "item-image",
                "class": "item-image",
                "style": {
                    "height": "200px",
                    "backgroundSize": "cover",
                    "backgroundPosition": "center"
                },
                "content": null,
                "backgroundImage": "",
                "children": []
            }
        ]
    },
    galleryItem: {
        "type": "div",
        "id": "newGalleryItem",
        "role": "gallery-item",
        "class": "gallery-item",
        "style": null,
        "content": null,
        "editable": true,
        "children": [
            {
                "type": "div",
                "id": "newGalleryImage",
                "role": "gallery-item-image",
                "class": "gallery-item-image",
                "style": {
                    "backgroundSize": "cover",
                    "backgroundPosition": "center"
                },
                "content": null,
                "backgroundImage": "",
                "children": [
                    {
                        "type": "div",
                        "id": "newGalleryOverlay",
                        "role": "gallery-item-overlay",
                        "class": "gallery-item-overlay",
                        "style": null,
                        "content": null,
                        "children": [
                            {
                                "type": "h3",
                                "id": "newGalleryTitle",
                                "role": "gallery-item-title",
                                "class": "gallery-item-title",
                                "style": null,
                                "content": "Название работы",
                                "children": []
                            },
                            {
                                "type": "p",
                                "id": "newGalleryDescription",
                                "role": "gallery-item-description",
                                "class": "gallery-item-description",
                                "style": null,
                                "content": "Описание проекта",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
};