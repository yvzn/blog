---
permalink: /2020/03/29/machine-learning-on-code-part-3.html
title: "Machine Learning sur du code source (partie 3)"
date: 2020-03-30T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
series: machine-learning-on-code
---

 Après un second article où je présente les étapes de collecte et de première analyse de la donnée présentés dans codelab, dans cette derniere partie je décris la mise en oeuvre du modèle d'apprentissage non supervisé et la manière dont on peut l'évaluer et le présenter.

<!--more-->

# Concevoir le modèle

Le premier exercice du codelab consiste à détecter les projets similaires entre eux. Partant de l'hypothèse que la formulation du code source _imite_ le langage naturel, les animateurs proposent d'utiliser les identifiants de variables, de méthodes, de packages, etc. pour regrouper les projets par thématique. Une intuition de ce principe pourrait être&nbsp;: deux projets contenant les identifiants _open_, _connexion_, _socket_, _send_, etc. dans des proportions similaires ont de fortes chances d'être liés à la même thématique, qu'on pourrait par exemple appeler _communication réseau_.

Babelfish et Gitbase permettent d'extaire les identifiants de tous les fichiers source d'un projet, en combinant requêtes SQL et _XPath_. Cependant si on utilise directement les identifiants tels quels, le vocabulaire produit est beaucoup trop grand pour être analysé. En effet les identifiants dans un programme consistent souvent en une combinaison de mots, par exemple `tcp_socket_connect` ou `get_remote_address`. Le nombre de combinaisons est donc quasiment illimité et il devient difficile de trouver des similarités. On donne, à titre de comparaison, la taille du vocabulaire russe qui contient environ 150.000 mots, le japonais environ 500.000 mots, les animateurs estiment celui de tous les identifiants informatiques à 49 millions de mots.

Une solution peut être de décomposer les identifiants en mots unitaires, pour réduire le vocabulaire. Par exemple `tcp_socket_connect` est transformé en liste `[tcp, socket, connect]`. Cela permet de réduire la taille du vocabulaire à des valeurs raisonnables. Les identifiants les plus rares (les moins fréquents) sont également enlevés.

Un modèle d'apprentissage non supervisé permet de constuire automatiquement les thématiques à partir des identifiants. En l'occurence le modèle mis en place s'appelle le _topic modeling_. C'est un modèle statistique qui va essayer de compter et regrouper les identifiants qui apparaissent souvent ensemble dans les mêmes fichiers. Ces regroupements d'identifiants sont ensuite utilisés par le modèle pour définir un _topic_.

Il est important de faire remarquer ici que cette notion de _topic_ est complètemet abstraite pour le modèle. Ainsi, s'il est capable de se rendre compte que certains mots apparaissent souvent ensemble, il ne sait en revanche pas apporter de _signification_ aux _topics_ ainsi découverts. Il va les nommer arbitrairement `topic_1`, `topic_2`, etc. Ce sera à nous de mettre une étiquette sur ces ensembles de mots.

![Exemple de topics extraits à partir d'identifiants (extrait)](https://github.com/yvzn/bbl-mloncode/raw/master/resources/topics_vs_identifiers.png)

# Créer le modèle

L'outil [BigARTM](http://bigartm.org/) permet de faire du _topic modeling_ en analysant le code source. Il faut lui fournir en entrée le nombre de topics souhaités et il va construire automatiquement le modèle d'apprentissage à partir des identifiants. Il peut ensuite fournir pour chaque fichier une liste de scores, représentant la proximité de ce fichier avec chacun des _topics_ identifiés.

Les animateurs du codelab proposent néanmoins d'ajuster légèrement le résultat fourni par l'outil. Le _sparsing_ consiste à supprimer (c'est à dire donner un score de 0) les topics ayant obtenu des scores déjà très faibles. Cela rend le modèle plus simple à interpréter de manière globale, en minimisant le nombre de topics à prendre en compte et le bruit généré par cette information peu significative.

# Evaluer les résultats

La généralisation du traitement consiste à extraire une moyenne de tous les topics de tous les fichiers d'un même projet. On peut alors calculer une distance entre les projets et regarder pour chaque projet les projets les plus proches. Cela donne une idée de similarité entre projets suivant une thématique.

En utilisant `git blame` (via _GitBase_) on peut également identifier les développeurs qui ont édité tel ou tel fichier et, par extrapolation, en déduire les _topics_ sur lesquels chacun a pu travailler. On peut alors également calculer une distance entre développeurs, qui donne une idée des développeurs travaillant sur les mêmes thématiques.

Puisqu'il s'agit des mêmes _topics_ que pour les projets, on peut également calculer une distance entre développeurs et projets, ce qui permet d'identifier les projets ayant les mêmes thématiques que celles sur lesquelles un développeur travaille habituellement.

Le dernier outil présenté, [pyLDAvis](https://github.com/bmabey/pyLDAvis), permet de visualiser graphiquement les topics générés par BigARTM et de comparer la distance entre _topics_ et entre projets.

![Topics visualisés via pyLDAvis](https://github.com/yvzn/bbl-mloncode/raw/master/resources/pyldaviz.png)

# Conclusion

Par manque de temps, nous n'avons pas pu aborder le second sujet qui consistait à suggérer algorithmiquement le nom d'une méthode à partir de son corps. Pour résumer, les animateurs nous ont indiqué utiliser des modèles de traduction automatisée (comme [OpenNMT](https://opennmt.net/) et [seq2seq](https://google.github.io/seq2seq/)) pour aborder cette problématique, et nous ont redirigé vers le [code source du codelab](https://github.com/mloncode/devfest2019-workshop).

Cet atelier m'a donc permis de m'initier au _MLonCode_ (Machine Learning on source code) dont l'approche inspirée du _Natural Language Processing_ permet d'extraire des métriques de sa codebase. Il a repris méthodiquement les principales étapes d'un projet de data science, ce qui permet de constater que la majorité du travail consiste à collecter la donnée (le code source) et à la formatter / à la nettoyer pour la rendre exploitable. Il a également mis l'accent sur le fait qu'il existe de nombreux outils pour se faciliter la tâche et qu'il ne faut pas hésiter à les utiliser.

{% include "partials/series.njk" %}
