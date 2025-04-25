---
permalink: /2021/02/07/compatibilite-descendante.html
title: "Compatibilité descendante"
date: 2021-02-08T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym>
Je pense que le web a pour vocation d'être accessible au plus grand nombre. Le langage HTML, par exemple, a intégré la compatibilité descendante dès sa conception. Si un ancien navigateur est incapable d'afficher une balise, il l'ignore simplement et essaie d'afficher le reste du document. C'est ce qui permet à la combinaison `<detail>` / `<summary>` de s'afficher de manière acceptable dans un vieux browser.

<!--more-->

De la même manière si le moteur de rendu CSS ne comprend pas une propriété, il l'igore et passe à la propriété suivante. Cela permet une amélioration progressive des styles, en fonction de ce qui est accepté par le client&nbsp;&mdash; par exemple les polices web.

Il est possible d'assurer cette compatibilité dans le code ECMAScript. C'est plus fastidieux, car il faut tester au préalable les API supportées par la plateforme. Il faut également vérifier le bon fonctionnement des nouveaux mots-clés du langage ou, à défaut, se limiter à une syntaxe plus ancienne et peut-être moins élégante.

Si on souhaite apporter exactement la même expérience, en terme de richesse visuelle et d'interactivité qu'avec une navigateur récent, cela nécessite une quantité non négligeable de temps, de documentation, de code, de tests.

Il me semble peut-être plus raisonnable de prendre le problème dans l'autre sens. C'est à dire partir d'un code de base qui fonctionne à peu près partout, qui privilégie d'abord la _fonctionnalité souhaitée_. Par la suite on peut ajouter des améliorations une par une, de manière progressive, en fonction de ce qui est accessible. D'abord les styles, puis les scripts, les API complexes, les animations, etc.

Quitte à accepter que le site semble moins dynamique&nbsp;: il reste utilisable par le plus grand nombre et on peut éventuellement informer l'utilisateur que son expérience pourrait être améliorée, grâce à une mise à jour.
