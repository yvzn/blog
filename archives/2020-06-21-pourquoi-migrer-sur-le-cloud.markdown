---
permalink: /2020/06/20/pourquoi-migrer-sur-le-cloud.html
title: "Migrer sur le cloud"
date: 2020-06-21T00:00+01:00
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags: article
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym>
Quels arguments évoquer avec son architecte préféré ou sa DSI, en parlant d'une éventuelle migration vers le cloud ? Les avantages sont la haute disponibilité de l'infrastructure, sa maintenance simplifiée et l'elasticité. Mais il ne faut pas perdre de vue que ces infrastructures sont publiques et que leur coût final peut être difficile à évaluer.

<!--more-->

L'argument souvent entendu en faveur d'une migration se résume à une réduction des coûts d'exploitation&nbsp;: par rapport à la gestion d'un datacenter physique ou à un abonnement chez un hébergeur traditionnel. C'est un argument valable, mais à prendre avec des pincettes - et surtout ce n'est pas le plus pertinent selon moi.

# Les avantages

Le principal gain est __la haute disponibilité__ et la performance de l'infrastructure qu'un fournisseur comme Google ou Microsoft peut mettre à disposition, avec des datacenters distribués sur toute la planète, reliés par des connexions réseau ultra rapides. C'est une formidable mécanique qu'il serait difficilement imaginable de mettre en oeuvre, dans des délais raisonnables, pour un seul projet - ici elle est accessible en quelques clics.

Le second avantage est __l'abstraction de la maintenance__ de cette infrastructure, que cette maintenance soit matérielle, réseau ou, dans une moindre mesure, logicielle. Plus besoin de se soucier du remplacement d'un disque dur défaillant, d'un firewall qui tombe ou d'un coup de pelleteuse malencontreux au coin de la rue, qui vient couper l'accès aux applications. Le niveau de service est généralement garanti contractuellement et la plupart des pannes sont gérées par _quelqu'un d'autre_.

Tous les cloud providers proposent en général une réplication sur plusieurs emplacements (_régions_),choisis spécifiquement avec des profils de risque diversifiés - en termes de catastrophes naturelles, de géo-politique, etc. afin de parer à toute éventualité. C'est un aspect peu mis en avant, mais la migration vers le cloud peut faciliter grandement la mise en place d'un plan de reprise d'activité en cas de catastrophe (disaster recovery plan) - et pour une fraction du coût auquel reviendrait, par exemple, la création d'une seconde salle blanche à l'autre bout du pays.

Le troisième avantage est __l'elasticité__ du cloud, qui permet d'augmenter ou de réduire l'allocation de ressources en fonction du besoin. C'est également possible avec des machines virtuelles mais, plus qu'avec n'importe quelle autre infrastructure, le cloud permet d'obtenir très rapidement de la capacité de calcul ou de stockage supplémentaire, sans délai de migration, de manière transparente pour l'utilisateur et même, pour certains services, de manière automatisée ou scriptée. On y pense moins mais la libération des ressources, lorsqu'elles ne sont plus utilisées, peut aussi permettre d'optimiser les coûts.

Enfin le dernier gain est une __protection contre les attaques externes__ les plus communes&nbsp;: denial of service, intrusion, ... Les fournisseurs n'ont en effet aucun intérêt à voir leur infrastructure s'effondrer ou être victime d'une attaque. Ils offrent donc tous une forme de protection de premier niveau. Il faut cependant remarquer que cette protection reste relative, qu'elle ne prémunit pas contre les attaques internes au réseau (provenant par exemple d'un autre utilisateur du même cloud) et qu'elle ne permet donc pas de faire l'économie des bonnes pratiques de sécurité, indispensables à toute application web.

# Les points d'attention

Car c'est le premier point qu'il faut avoir à l'esprit lors d'une migration sur le cloud&nbsp;: __ces infrastructures sont publiques__ par défaut, ce qui implique qu'y cohabitent applications d'entreprise, projets de hobbyistes et, potentiellement, programmes malveillants. Il est relativement aisé pour un attaquant de _deviner_ l'URI d'un service et d'y accéder s'il est mal protégé (services identifiés par un numéro, ports configurés par défaut, mots de passe stockés sur GitHub...). Et s'il est possible d'isoler logiquement ou physiquement ses ressources, le coût d'une privatisation des réseaux est loin d'être neutre. Ces aspects sont donc bien à prendre en compte lors de la conception de la migration.

En effet, les __coûts d'exploitation effectifs__ sont le deuxième élément à ne pas négliger. La manière dont ils sont présentés par les fournisseurs peut parfois faire miroiter des économies substancielles. Et pourtant... entre les offres initialement gratuites qui deviennent rapidement onéreuses dès qu'on dépasse un certain seuil ou qu'on veut accéder à certaines fonctionnalités, les offres à la politique tarifaire obscure, utilisant des unités à la définition ambigüe (Gigaoctet-seconde ? RU ?) et les offres au prix exhubérant (tels que les réseaux privés virtuels) qu'il faudra, peut-être, malgré tout mettre en oeuvre... le coût d'exploitation final est souvent complexe à anticiper dès le début du projet.

Troisième point enfin, le fait de déléguer la mise en oeuvre de son infrastructure à un tiers se fait forcément au prix d'une certaine __perte de contrôle__ sur ladite infrastructure. Cette perte est plus ou moins impactante selon le besoin&nbsp;: plus d'accès physique au serveurs, systèmes d'exploitation gérés par le fournisseur, etc. Suivant les contraintes du système d'information, suivant également les contraintes réglementaires applicables, il ne sera pas forcément possible ou judicieux de migrer tel ou tel applicatif vers le cloud.

# Choisir un provider

Ces différents éléments peuvent amener naturellement à choisir tel ou tel cloud provider, en fonction des contraintes du domaine, du métier&nbsp;; de l'écosystème aussi&nbsp;: par exemple, on imagine mal un site comme la Fnac migrer chez Amazon Web Services&nbsp;; en fonction également de l'offre de service fournie, des langages de programmation supportés, etc.

Une thématique que l'on voit émerger est de se laisser de la marge de manoeuvre pour pouvoir, le cas échéant, changer de fournisseur de service. On parle de réversibilité.

Il s'agit concevoir dès le départ de manière modulaire, pour identifier et limiter les coûts d'un éventuel changement&nbsp;; en respectant les bonnes pratiques d'architecture, en gardant son domaine métier indépendant de l'infrastructure&nbsp;; en limitant autant que possible son adhérence à un service spécifique. Ou au contraire, à accepter et à documenter cette adhérence, de manière pragmatique, mais pour un temps donné (par exemple pour optimiser le time-to-market) ou pour un scope fonctionnel restreint (par exemple pour une campagne publicitaire limitée dans le temps) - tout en imaginant une solution de repli et pour ne pas accumuler de la dette sur la brique concernée.

# Conclusion

<acronym title="Amazon Web Services">AWS</acronym> a été lancée en 2006. A l'image de la plateforme de services d'Amazon, la migration des applications web vers les clouds publics fait partie de ces révolutions silencieuses qui changent durablement le paysage de l'informatique. Si certaines promesses du début se sont au fil du temps transformées en attentes différentes, à mesure que les grandes compagnies et les process d'entreprise sont entrés dans la danse, le rythme semble s'accèlèrer&nbsp;: les trois derniers projets sur lesquels je suis intervenu, par exemple, ont tous les trois migré vers le cloud.
