
# Migrations vers le cloud

Cela fait X ans que <acronym title="Amazon Web Services">AWS</acronym> a été lancé. A l'image de la plateforme de services d'Amazon, la migration des applications web vers les clouds publics fait partie de ces révolutions silencieuses qui changent le paysage de l'informatique en profondeur. Et si certaines promesses du début se sont au fil du temps transformées en attentes différentes, à mesure que les grandes compagnies et les process d'entreprise sont entrés dans la danse, le rythme s'accèlère : les trois derniers projets sur lesquels je suis intervenu ont tous les trois migré vers le cloud. Avec des approches et difficultés diverses.



Les avantages au cloud, ceux qu'on peut avancer pour convaincre, sont la haute disponibilité de l'infrastructure, la maintenance simplifiée et l'elasticité automatique. Il ne faut cependant pas perdre de vue que ces infrastructures sont souvent publiques, que leur coût final est difficile à évaluer et que leur mise en oeuvre implique une perte de contrôle sur des éléments clés du SI.

<!--more-->

# Pourquoi migrer ?

L'argument souvent entendu en faveur d'une migration vers le cloud se résume plus ou moins à une réduction des coûts d'exploitation, par rapport à un datacenter physique ou à un abonnement chez un hébergeur classique. C'est un argument tout à fait valide, mais il faut le prendre avec des pincettes : certains coûts sont (volontairement ?) cachés par les fournisseurs - et surtout ce n'est pas le plus important.

## Les avantages

Le principal gain est __la haute disponibilité__ et la performance de l'infrastructure qu'un Google ou qu'un Microsoft peut mettre à disposition, avec des datacenters distribués sur toute la planète, reliés par des connexions ultra rapides. C'est toute une mécanique titanesque qu'il serait inimaginable de mettre en oeuvre dans des délais raisonnables pour un seul projet - et elle est accessible en quelques clics.

Le second avantage est __l'abstraction de la maintenance__ de cette infrastructure, que cette maintenance soit matérielle, réseau ou, dans une moindre mesure, logicielle. Plus besoin de se soucier du remplacement d'un disque dur défaillant, d'un firewall qui tombe ou d'un coup de pelleteuse malencontreux sur les travaux de réseau au coin de la rue, qui vient couper l'accès à vos services. Le service est garanti et la plupart des pannes sont couvertes par quelqu'un d'autre.

Tous les cloud providers proposent en général une réplication sur plusieurs emplacements, choisis spécifiquement avec des profils de risque diversifiés - en termes de catastrophes naturelles, de géo-politique, etc. afin de parer à toute éventualité. C'est un aspect peu mis en avant, mais la migration vers le cloud peut faciliter grandement la mise place d'un plan de reprise d'activité en cas de catastrophe (disaster recovery plan), pour une fraction du coût auquel reviendrait, par exemple, la réplication d'une salle blanche à l'autre bout du pays.

Le troisième avantage est __l'elasticité__ du cloud, qui permet d'augmenter ou de réduire l'allocation de ressources en fonction du besoin. C'est également possible avec des machines virtuelles mais, plus qu'avec n'importe quelle autre infrastructure, le cloud permet d'obtenir très rapidement de la capacité de calcul ou de stockage supplémentaire, sans délai de migration, de manière transparente pour l'utilisateur et, pour certains services, de manière automatisée ou scriptée.

Enfin le dernier gain est une __protection contre les attaques externes__ les plus communes : denial of service, intrusion, ... Les fournisseurs n'ont en effet aucun intérêt à voir leur infrastructure s'effondrer ou être victime d'une attaque. Ils fournissent donc tous une forme de protection de premier niveau. Il faut cependant remarquer que cette protection reste relative, qu'elle ne prémunit pas contre les attaques internes au réseau (provenant par exemple d'un autre utilisateur du même cloud) et qu'elle ne permet donc pas de faire l'économie des bonnes pratiques de sécurité indispensable à toute applicaton web.

## Les points d'attention

C'est le premier point qu'il faut avoir à l'esprit lors d'une migration sur le cloud : __ces infrastructures sont publiques__ par défaut, ce qui signifie qu'y cohabitent applications d'entreprise, projets de hobbyistes et, potentiellement, programmes malveillants. Il est relativement aisé pour un attaquant de _deviner_ les identifiants d'un service et d'y accéder s'il est mal ou pas protégé. Et s'il est possible d'isoler logiquement ou physiquement ses ressources, le coût de ces réseaux privés est loin d'être neutre. Ces aspects sont donc bien à prendre en compte lors de la conception de la migration.

Les __coûts effectifs__ sont le deuxième élément à ne pas négliger. La manière dont ils sont présentés par les fournisseurs peuvent parfois faire miroiter, à tort, des économises substancielles sur le coût d'exploitation. Entre les offres initialement gratuites, qui deviennent rapidement onéreuses dès qu'on dépasse une certaine activité ou qu'on veut accéder à certaines fonctionnalités, celles à la politique tarifaire obscure utilisant par exemple des unités peu communes ou à la définition ambigüe, et enfin les services au prix prohibitif (tels que les réseaux privés virtuels) qu'il faudra, peut-être, malgré tout mettre en oeuvre... en réalité, le coût d'exploitation final est souvent difficile à prédire dès le début du projet.

Troisième point enfin, le fait de déléguer la mise en oeuvre de son infrastructure se fait forcément au prix d'une certaine __perte de contrôle__ plus ou moins importante sur cette infrastructure : plus d'accès physique au serveurs, systèmes d'exploitation gérés par le fournisseur, etc. Ainsi, suivant les contraintes du système d'information, suivant également les contraintes réglementaires applicables, il ne sera pas forcément possible ou judicieux de migrer tel ou tel applicatif vers tel ou tel service.

# Conclusion : choisir un provider

Ces différents éléments peuvent amener naturellement à choisir un cloud provider, en fonction des contraintes du domaine, du métier, de l'écosystème : on imagine mal une boutique comme la Fnac aller chez AWS ; en fonction également de l'offre de service fournie, des langages de programmation supportés, etc.

Une thématique que l'on voit émerger, c'est de se laisser de la marge de manoeuvre pour pouvoir changer de fournisseur de service (réversibilité). Il ne s'agit pas forcément d'utiliser des plate-formes compatibles avec plusieurs cloud providers, pour l'instant encore bredouillantes et basées sur le plus petit dénominateur commun. Il ne s'agit pas non plus de tout redéployer en utilisant des briques personnalisées sans profiter des facilités fournies.

Il s'agit concevoir dès le départ de manière modulaire, pour identifier et limiter les coûts d'un changement : en respectant les bonnes pratiques d'architecture, en gardant son domaine métier indépendant de l'infrastructure ; en limitant si besoin son adhérence à un service spécifique ou au contraire, à accepter cette adhérence pour un temps donné, en imaginant le cas échéant une solution de repli.

# Quelles stratégies ?

# Lift and Shift

Redéployer une infrastructure telle quelle dans le cloud

Gains estimés
- coût de run

Points d'attention
- les mêmes que lors de toute migration d'infrastructure
    - migration des bases
    - mise à jour des DNS

Inconvénients
- on ne bénéficie pas des améliorations du cloud
- tout ce dont on a besoin est-il disponible / utilisable

# Re-écriture

Application Cloud Native

Gains / avantages du cloud
- elasticité
- résilience
- performance
- puissance de calcul

Points d'attention
- Délai
- ISO fonctionnalités
- Vendor locked-in
    - réversibilité

# Migration partielle

Migrer l'application telle quelle
- mais avec certains services ou améliorations du cloud
- optimiser le coût / la performance de certaines infrastructures

Points d'attention
- mise à jour des liens avec les autres applications / clients (DNS, routes, Firewalls)
