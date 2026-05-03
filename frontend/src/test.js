import { useState, useEffect } from 'react';
const [siteData, setSiteData] = useState(structure);




function generateId() {
    return Math.random().toString(36).substring(2, 10);
}

// рекурсивная функция проходит по всем прямым потомкам элемента, формируя массив объектов (массив элементов)
// этот массив сохраняется в свойство .children псевдоэлемента структуры
// принимает аргументом сам DOM элемент, по которому надо пройтись
// и псевдоэлемент, к которому и будет добавлен массив пвсевдо-элементов прямых потомков
function findChildren(DOMElement, psevdoDomElement) {
    const chirdenDom = [];
    const children = DOMElement.children;
    const childrenArray = [...children];

    childrenArray.forEach((child, index) => {
        const psevdoDomElem = {};
        psevdoDomElem.tagName = child.tagName;
        psevdoDomElem.className = child.classList;
        psevdoDomElem.id = child.dataset.id || generateId();
        if (child.matches('p,h1,h2,h3,h4,h5,h6')) {
            psevdoDomElem.textContent = child.innerHTML;
        }
        chirdenDom.push(psevdoDomElem);
        findChildren(child, psevdoDomElem);
    });

    psevdoDomElement.children = chirdenDom;
}

let mainBlockDom = document.querySelector('.product-card');

let mainPsevdoBlock = {
    tagName: "div",
    className: "product-card"
};

findChildren(mainBlockDom, mainPsevdoBlock);

console.log(mainPsevdoBlock);


// функция принимает структуру псевдо-элементов и ДОМ элемент, в который расарсит новый html
// и формирует  полноценный html для сайта клиента на основе структуры

function buildHtml(psevdoElem, DOMElem) {
    psevdoElem.children.forEach((elem, index) => {
        let tagName = elem.tagName;
        const newElement = document.createElement(tagName);
        newElement.className = elem.className;
        newElement.id = elem.id;
        if(elem.hasOwnProperty('textContent')) {
            newElement.innerHTML = elem.textContent;
        }
        DOMElem.append(newElement);
        buildHtml(elem,newElement);
    });
}
let testDomElem = document.querySelector('.test');
buildHtml(mainPsevdoBlock, testDomElem)

function buildSite(psevdoElem, DOMElem) {
    let tagName = psevdoElem.type;
    const newElement = document.createElement(tagName);

    // Все поля элемента
    if (psevdoElem.class) newElement.className = psevdoElem.class;
    if (psevdoElem.id) newElement.id = psevdoElem.id;
    if (psevdoElem.style) newElement.style.cssText = psevdoElem.style;

    // Если есть content (текстовое содержимое)
    if (psevdoElem.content !== null && psevdoElem.content !== undefined) {
        newElement.textContent = psevdoElem.content;
    }

    DOMElem.appendChild(newElement);

    // Рекурсивно обрабатываем детей
    if (psevdoElem.children && psevdoElem.children.length > 0) {
        psevdoElem.children.forEach((elem, index) => {
            buildHtml(elem, newElement);
        });
    }
}
