---
permalink: /2019/10/27/spring-boot-azure.html
title: "Exécuter une application Spring Boot sur Azure"
date: 2019-10-28T00:00+01:00
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
series: spring-boot-azure
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym> La ressource
de type _Application Web_ (ou _App Service_) permet de déployer rapidement
une application Java Spring Boot dans le cloud Microsoft. La pile de runtime
_Linux_ et _Java SE_ est celle qui convient pour ce cas d'utilisation.
Pour l'environnement de développement, un plan tarifaire gratuit ou basique
est suffisant. Dans ce premier article,  je décris comment créer et configurer une
telle ressource.

<!--more-->

# L'application

Comme exemple, j'ai choisi [La Recyclette](https://recyclette.azurewebsites.net/),
mon application utilisant la reconnaissance visuelle et la webcam du navigateur pour déterminer
si un déchet peut être recyclé.

C'est une application Spring Boot 2 assez _classique_, avec le moteur de template `Thymeleaf`
et une base de données en mémoire `HSQLDB`. Le code source est disponible sur
[github.com](https://github.com/yvzn/recikligi/).

# Créer l'hébergement sur Azure

Pour accueillir l'application, nous devons créer une ressource dans le portail Azure de type
_Application Web_ (ou _App Service_ en anglais, ou encore _Web App_). Ce service permet d'héberger
du code programmé dans une variété de langages et de frameworks, dont Java, pour un prix raisonnable.

Pour le reste de l'article, je suppose que vous êtes connectés au [portail Azure](https://portal.azure.com/)
et que vous
avez une souscription (un abonnement) valide. L'abonnement gratuit ou l'abonnement d'essai suffisent.

En haut à droite du portail, sélectionner _+ Nouvelle Ressource_ et rechercher _Application Web_.
A cette étape, il faut définir un groupe de ressources, le nom de l'instance, le runtime et
le plan tarifaire.

## Le groupe de ressources

La notion de groupe de ressources est générique. Elle permet de placer dans un même endroit des
services qui, en théorie, travaillent ensemble. Il s'agit d'un groupement purement logique,
qui permet de retrouver facilement ses applications et d'organiser sa souscription.

Autre avantage, la suppression du groupe de ressource est récursive et permet, en deux ou trois clics,
de supprimer tout un ensemble de ressources dont on n'a plus besoin. C'est très pratique pour
nettoyer son espace après des tests.

## Le nom de l'instance

Le nom de l'instance applicative, en plus d'identifier votre application, définit le sous domaine `***.azurewebsites.net` sous lequel elle sera exposée. Il doit
par conséquent être unique et l'interface vérifie automatiquement que c'est bien le cas.

Vous pourrez ajouter un nom de domaine personnalisé ultérieurement, mais le nom de l'instance doit
malgré tout être spécifique... et ce parmi toutes les _Applications Web_ Azure.

## Le runtime

Plusieurs piles de runtime sont disponibles pour les _App Service_. Elles se composent
d'un système d'exploitation et d'un framework.

Puisque l'application Spring Boot d'exemple est packagée sous la forme d'un jar exécutable
(c'est le cas par défaut), il faut choisir _Linux_ et _Java 11_ > _Java SE_. Si elle avait été packagée
comme un war, la possibilité d'utiliser un Tomcat managé est également offerte.

La pile de runtime peut être changée ultérieurement et à tout moment, donc pas de panique,
cela pourra être ajusté après coup.

## La région

Cette notion primordiale définit dans quel datacenter l'application va effectivement
être installée.

Il faut ici faire un compromis. On a la possibilité de choisir un datacenter en Europe
(voire en France) afin de bénéficier d'une meilleure latence réseau pour ses utilisateurs.

Dans les faits (et en fonction de la complexité de votre application), vous rencontrerez
probablement d'autres goulots d'étranglement avant que ce ne soit la latence réseau
liée à la région Azure qui ait un impact.

Les datacenters américains ont quant à eux l'avantage de recevoir les mises à jour
logicielles en premier, ils bénéficient donc plus rapidement des nouvelles fonctionnalités
du cloud Azure et on peut accéder plus facilement à toutes les versions bêta des différents
services.

Mais indépendamment de ces considérations, vous devrez peut-être dans tous les cas choisir un datacenter
en Europe, pour des problématiques réglementaires liées au RGPD
(si vous traitez de données sensibles) ou propres au secteur d'activité.

## Le plan tarifaire

C'est la combinaison d'une puissance de calcul donnée (CPU + RAM) avec le plan tarifaire associé.
C'est là où vous pouvez définir le dimensionnement et évidemment le coût de votre run.

Il existe une grande variété de plans tarifaires, certains gratuits ou peu onéreux,
d'autres super premium++ avec une capacité de calcul dédiée. Pour le développement, les offres gratuites ou basiques peuvent suffir.

Deux choses sont
à noter cependant. Premièrement, certaines offres n'autorisent pas l'option _Always On_.
Cela signifie que Azure peut choisir d'éteindre automatiquement votre application si aucun
utilisateur n'y est connecté. C'est pratique pour faire des économies... mais plus
pénalisant pour le premier utilisateur qui reviendra sur l'application, il subira un
temps de redémarrage non négligeable (celui du conteneur + celui de Java + celui de Spring)

Deuxièmement, certaines fonctionnalités ne sont disponibles qu'à partir d'une certaine puissance
de calcul, par exemple les noms de domaine personnalisés ou la mise à l'échelle automatique.

## Mise à l'échelle

Quelque soit le plan selectionné, vous pouvez là aussi changer d'avis ultérieurement via le
scaling horizontal et/ou vertical.

Le scaling vertical (ou _Montée en puissance_ ou _Scale Up_ en anglais) permet d'augmenter
la puissance de calcul d'un App Service Plan.

Le scaling horizontal  (ou _Montée en charge ou _Scale Out_ en anglais) permet de répartir votre application
(automatiquement ou non) sur plusieurs instances s'exécutant parallèle. Il faut bien sûr que votre code le supporte, sinon
gare aux conflits et aux race conditions.

# Conclusion

Après avoir choisi ces options, vous pouvez désormais cliquer sur _Vérifier_ pour
contrôler l'ensemble des paramètres, puis sur _Créer_ pour lancer le provisioning
du service. Cet étape peut prendre quelques secondes, une notification apparaîtra dans
le portail lorsque tout sera prêt.

Dans un second article, je décrirai comment déployer automatiquement l'application dans
cette nouvelle ressource.

{% include "partials/series.njk" %}
