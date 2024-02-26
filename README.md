<p align="center">
    <img src="http://danyella.works/logo.png">
</p>

<h1 align=center>Site de Danyella Strikann</h1>

<div align="center">
    <img alt="Version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmovva-gpu%2FPortfolioV2%2Fmaster%2Fpackage.json&query=%24.version&style=for-the-badge&label=version&labelColor=dimgray&color=hotpink">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-red?style=for-the-badge&labelColor=dimgray">
    <img alt="Pug version" src="https://img.shields.io/badge/Pug-3.0-A86454?style=for-the-badge&logo=pug&logoColor=white&labelColor=dimgray">
    <img alt="Node.js version" src="https://img.shields.io/badge/Node-21.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=dimgray">
    <img alt="Express version" src="https://img.shields.io/badge/Express-4.18-259dff?style=for-the-badge&logo=express&logoColor=white&labelColor=dimgray">
</div>

## Introduction

Ce site est mon plus gros projet web jusqu'ici, combinant un moteur de template [Pug](https://pugjs.org), du back géré avec [Express](https://expressjs.org) et donc [Node.js](https://nodejs.org), ainsi que des animations avec [ScrollMagic](https://scrollmagic.io) et [GSAP](https://gsap.com).

## Contenu

*   Une page d'accueil, contenant une petite présentation de moi
*   Un portfolio, présentant certains de mes projets (Validity et ma SAE105)
*   Une page recensant beaucoup plus de mes projets
*   Mon C.V.
*   Mon adresse mail et mon LinkedIn dans le menu

## Fonctionnalités

### Accueil

*   Un effet de parallax avec GSAP
*   Des animations déclenchées au scroll avec ScrollMagic
*   Un effet de *brouillage* de texte sur une partie du deuxième paragraphe

### Portfolio

*   Un effet de parallax sur la bannière hero avec le mouvement de la souris
*   Du texte se déplaçant avec GSAP et ScrollMagic
*   Un effet de *brouillage* de texte sur le titre de la section sur Validity
*   Des boutons arc-en-ciels pour les liens des différentes sections
*   Une transition lors d'un click sur l'un de ces boutons
*   Encore plus d'animations ScrollMagic X GSAP

### Projets

*   Un bouton incitant l'utilisateur à scroller vers le bas apparaissant avec ScrollMagic
*   Une grille avec mes différents projets

### Toutes les pages

*   Un menu animé avec GSAP
*   Un bouton contenant des liens vers mes réseaux
*   Du contenu responsive (mise à jour prévue pour le Portfolio)

### Back-end

*   Distribution statique du dossier www/
*   Routeurs pour faire le rendu des templates dans views/
*   Utilisation du moteur de template Pug
*   Gestion et affichage des erreurs
*   Authentification requise pour accéder au dossier private/

---

<p align="center">Made with all my love 🤍</p>
