---
permalink: /2020/09/15/csv-compatible-excel.html
title: "Créer un CSV compatible Excel"
date: 2020-09-16T00:00+01:00
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags: code
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym>
Pour générer un fichier CSV qui peut-être ouvert sans problème dans les versions récentes de Excel, utiliser l'encodage _UTF-16LE_ et le caractère _tabulation_ comme séparateur.

<!--more-->

# Un export facile à générer

L'avantage du format de fichier CSV pour exporter ses tableaux de données est qu'il est très facile à écrire depuis n'importe quel language de programmation&nbsp;: il s'agit juste d'un fichier texte, où les colonnes sont séparées par un caractère prédéfini, généralement la virgule.

Un deuxième avantage est que ce format est compatible avec de nombreux logiciels bureautiques, dont Excel. Malheureusement le tableur de Microsoft a sa propre façon d'interprétér les fichiers CSV qui, si on n'y prête pas attention, peuvent rendre les informations exportées illisibles. Par exemple si les ces dernières contiennent des caractères accentués ou... des virgules.

# Attention à l'encodage

Premier point d'attention&nbsp;: les données qui contiennent des caractères accentués ou d'une langue non latine. La norme actuelle pour écrire de telles données dans un fichier texte est d'utiliser un encodage _Unicode_ et _UTF-8_ est de facto le standard _Unicode_ sur internet.

Malheureusement les versions récentes d'Excel n'acceptent que _UTF-16LE_, un encodage différent et non rétro-compatible. Si on utilise autre chose (dont _UTF-8_ ou _ANSI_) alors les caractères accentués vont mal s'afficher dans Excel. Une solution simple pour le développeur est donc, lors de l'écriture de son fichier, de privilégier l'encodage _UTF-16LE_, qui est par ailleurs bien supporté par la plupart des autres logiciels modernes.

# Gare aux séparateurs

Concernant les séparateurs entre les colonnes, le format CSV (_Comma-separated values_) utilise normalement une virgule. A l'ouverture du fichier, cela ne pose aucun problème pour les utilisateurs d'Excel anglophones. En français par contre, les données vont s'afficher dans une seule colonne, les virgules resteront à l'écran et forceront l'utilisateur à utiliser l'outil de reformatage pour visualiser les informations comme souhaité.

La raison est que Excel se base sur un paramètre peu connu des options linguistiques de Windows pour déterminer quel séparateur utiliser lors de la lecture des fichiers CSV&nbsp;: l'option _séparateur de liste_ du panneau de configuration de Windows. C'est une virgule en anglais, ce qui permet donc de lire les CSV de manière transparente. En français, c'est... un point-virgule. Dans un environnement de travail globalisé où les fichiers sont échangés d'une région à l'autre, on peut s'interroger sur la robustesse de se baser sur un réglage aussi local au poste de travail.

Heureusement, une solution simple existe là aussi. Excel supporte également bien le caractère _tabulation_ comme séparateur. Second avantage, les données exportées contiennent rarement un caractère _tabulation_, ce qui évite d'avoir à échapper toutes les virgules dans les valeurs.

Techniquement ce n'est plus un fichier CSV mais un fichier TSV (_Tabulation-separated values_) mais la majorité des tableurs, dont Excel, savent gérer le chargement, même si l'extension ne correspond pas.

# Méfiance avec l'injection

Enfin une dernière remarque un peu hors un peu hors contexte mais qui mérite toujours d'être rappelée.

Attention à [l'injection de commandes](https://owasp.org/www-community/attacks/CSV_Injection) dans les fichiers CSV. Un des intérêts d'un tableur est de pouvoir saisir des formules de calcul dans les cellules, formules qui commencent généralement par `=`.

Or il est facile de générer des formules malicieuses permettant de voler des données, de générer des hyperliens frauduleux ou d'exécuter des programmes arbitraires sur le poste du client. Il faut donc bien penser à nettoyer les données lors de la génération de fichiers CSV, surtout si ces données proviennent d'une source extérieure et/ou de saisies par des utilisateurs. Il suffit d'échapper les caractères spéciaux comme `=`.

# Une solution qui fonctionne

Voilà une problématique simple qui dans les faits s'avère plus complexe que prévue à mettre en oeuvre. Moins complexe toutefois que d'intégrer une librairie tierce capable de générer de vrais fichiers Excel, ce qui reste nécessaire pour des fonctionnalités plus avancées.

Cela m'inspire d'autres réflexions plus globales sur la manière dont les applications doivent gérer l'internationalisation, sur le besoin de mieux tester ses programmes avec des profils d'utilisateurs multilingues et diversifiés.
