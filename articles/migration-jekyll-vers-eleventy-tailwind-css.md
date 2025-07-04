---
title: "Pourquoi j'ai migré mon blog vers Eleventy et Tailwind CSS"
date: 2025-07-03T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags: article
---

J'ai récemment migré mon blog personnel de Jekyll (Ruby) vers Eleventy (JavaScript) avec Tailwind CSS. L'objectif était double : harmoniser le design avec mon site principal et simplifier la maintenance en unifiant la stack technique. Le résultat : un blog plus cohérent visuellement et plus facile à maintenir.

<!--more-->

## Introduction

Je voulais que mon blog ressemble à mon site principal. Au-delà de l'esthétique, je voulais aussi arrêter de jongler entre Ruby et JavaScript. En migrant vers Eleventy et Tailwind CSS, j'ai rationalisé ma stack, simplifié les mises à jour de sécurité, et gagné en sérénité.

## Un blog qui vieillissait mal

Mon blog tournait sur Jekyll depuis plusieurs années. À l'époque, c'était un choix logique : simple, bien documenté, et largement supporté. Mais avec le temps, plusieurs problèmes sont apparus :

- Chaque mise à jour de gem Ruby était complexe à valider et à tester.
- Le design ne correspondait plus à mon site principal.
- Je passais plus de temps à maintenir l'outil qu'à écrire.

## Entre inertie et complexité

J'ai longtemps hésité à migrer. La philosophie et l'écosystème Ruby m'ont toujours séduit par leur richesse et leur simplicité d'accès.

Et puis, il fallait choisir une nouvelle stack.

Ce que je voulais, c'était :

- Un générateur statique simple, sans build complexe.
- Une stack JavaScript, comme beaucoup de mes autres projets.
- Une intégration facile avec Tailwind CSS, pour pouvoir réutiliser le design existant.

J'ai commencé à explorer les alternatives. _Astro_ était prometteur, mais il me semblait un peu trop complexe pour mettre en place les customisations que je souhaitais. _Next.js_ nécessitait toute une infrastructure de build, et je ne voulais pas me plonger dans un framework complet.

## Eleventy + Tailwind CSS

Eleventy m'a séduit par sa simplicité. Pas de framework imposé, pas de magie noire. Juste du HTML, du Markdown, et un peu de JavaScript, uniquement au moment du build.

Avec Tailwind CSS, j'ai pu en grande partie réutiliser le design de mon site principal, qui utilisait déjà cette techno. Tailwind CSS a aussi ses défauts, mais la cohérence visuelle est immédiate, avec quelques adaptations mineures.

Enfin, j'ai juste des fichiers statiques à déployer, sans dépendances complexes.

## Le résultat : un blog plus simple, plus cohérent

Depuis la migration :

- Le design est identique à mon site principal.
- Je n'ai plus à gérer Ruby ou Bundler.
- Les mises à jour de sécurité sont plus simples : je peux appliquer les mises à jour de dépendances déjà vérifiées dans d'autres projets.

Les temps de build sont rapides, et je peux facilement ajouter des fonctionnalités JavaScript si nécessaire.

Et surtout : je prends à nouveau plaisir à écrire.

## Conclusion

Migrer vers Eleventy m'a permis de simplifier ma stack, d'unifier mes projets, et de réduire les frictions techniques. C'est un choix qui me permet de me concentrer sur l'écriture, plutôt que sur la maintenance.
