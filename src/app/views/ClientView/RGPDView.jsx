import React, {useState} from 'react'
import arrow from '../../assets/images/arrow-down.png'

const RGPDView = () => {
  const [isOpen, setIsOpen] = useState([]);
  const handleClick = (e) =>{
    const newIsOpen = [...isOpen];
    newIsOpen[e] = !newIsOpen[e];
    setIsOpen(newIsOpen);
  }
  
  return (
    <div className='border-solid border-2 bish-border-gray py-3 px-6 rounded-xl bish-bg-white transition-all duration-500 hover:bish-border-blue'>
      <h1>RGPD</h1>
      <p>Bish se réserve la possibilité de modifier, à tout moment, en tout ou partie sa politique de données personnelles. Vous êtes donc invités à consulter régulièrement cette page afin de prendre connaissance des changements éventuels effectués. Si ces changements sont impactant pour vous, alors nous vous les notifierons directement (par email, en magasin ou sur Bish.com).</p>
        <h4>La collecte des données :</h4>
          <div>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(1)}>
                <label className='font-medium my-auto'>Quelques définitions</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[1] ? 'rotate-180':''} h-8`} />
            </button>
            <ul className={isOpen[1] ? "block" : "hidden"}>
              <li>
                <h5>Donnée à caractère personnel</h5>
                <p>Une donnée à caractère personnel est une information relative à une personne physique identifiée ou qui peut être identifiée, directement ou indirectement, par référence à un numéro d’identification ou à un ou plusieurs éléments qui lui sont propres. (Nom, prénom, adresse numéro de téléphone, données de localisation…)</p>
              </li>
              <li>
                <h5>Catégorie particulières de données à caractère personnel ou données sensibles:</h5>
                <p>Données à caractère personnel qui révèle l'origine raciale ou ethnique, les opinions politiques, les convictions religieuses ou philosophiques ou l'appartenance syndicale, ainsi que le traitement des données génétiques, des données biométriques aux fins d'identifier une personne physique de manière unique, des données concernant la santé ou des données concernant la vie sexuelle ou l'orientation sexuelle d'une personne physique sont interdits.</p>
              </li>
              <li>
                <h5>Traitement :</h5>
                <p>Toute opération effectuée sur une donnée à caractère personnel telle que la collecte, l’enregistrement, la consultation, la modification, la diffusion etc…</p>
              </li>
              <li>
                <h5>Responsable de traitement :</h5>
                <p>Entité qui détermine les finalités et les moyens d’un traitement.</p>
              </li>
              <li>
                <h5>Sous-traitant :</h5>
                <p>Entité qui traite les données pour le compte du responsable de traitement.</p>
              </li>    
            </ul>

            <button className='flex justify-between w-full' id="2" onClick={(e) => handleClick(2)}>
              <label className='font-medium my-auto'>Le délégué à la protection des données</label>
              <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[2] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[2] ? "block" : "hidden"}>Afin de garantir la sécurité et confidentialité de vos données, Bish a nommé un délégué à la protection des données à caractère personnel (Data Protection Officer). Il tient un registre des traitements de données opérés par le Groupe Bish. Pour toute information complémentaire vous pouvez le contacter  : dataprotectionofficer@kiabi.com</p>

            <button className='flex justify-between w-full' id="3" onClick={(e) => handleClick(3)}>
              <label className='font-medium my-auto'>Les responsables de traitements</label>
              <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[3] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[3] ? "block" : "hidden"}>La société KIABI Europe, société par actions simplifiée, immatriculée au RCS de Lille Métropole, sous le numéro 344 103 270 dont les sièges sociaux sont sis 100 rue du Calvaire, 59510 Hem (France), et la société BUNSHA (société du Groupe Bish), société par actions simplifiée, immatriculée au RCS de Lille Métropole, sous le numéro 312 347 362 dont les sièges sociaux sont sis 100 rue du Calvaire, 59510 Hem (France), sont conjointement responsables du traitement de vos données personnelles, c’est-à-dire qu’elles déterminent conjointement les finalités et les moyens des traitement définis ci-après. Elles ont signé un accord entre elles, déterminant leurs rôles respectifs et leurs relations vis-à-vis des personnes concernées. Les grandes lignes de cet accord pourront être mis à votre disposition sur demande effectuée auprès du délégué à la protection des données.</p>
            
            <button className='flex justify-between w-full' id="4" onClick={(e) => handleClick(4)}>
              <label className='font-medium my-auto'>Traitements effectues, finalites et fondements legaux</label>
              <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[4] ? 'rotate-180':''} h-8`} />
            </button>
            <div className={isOpen[4] ? "block" : "hidden"}>
              <span>Bish opère différents traitements sur vos données. Vous trouverez ci-après la liste des différentes finalités et les fondements légaux sur lesquels elles sont basées</span>
              <ul>
                <li>
                  <h5>Traitements opérés sur la base légale d’un contrat</h5>
                  <h6>- Le passage de commande en ligne et la livraison des articles commandés</h6>
                    <p><span>Les données traitées :</span> Civilité, nom, prénom, date de naissance, email, téléphone, adresse postale, adresse IP, Système d’exploitation mobile, type d’appareil utilisé, numéro de carte de fidélité, contenu des achats clients.</p>
                    <p><span>La durée de conservation :</span>Les données (autres que vos informations bancaires) sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter. Les informations bancaires sont conservées 13 mois par notre prestataire de paiement.</p>
                    <p><span>Localisation du traitement :</span>Les données sont conservées dans l’Union Européenne et nous nous assurons que toutes les mesures techniques et organisationnelles soient mises en œuvre pour les protéger.</p>
                    <p><span>Destinataires des données </span>En interne : Le service client Bish. En externe : Notre prestataire de paiement (Payline).</p>
                    <p>Bish n’a pas accès à vos informations bancaires. Ces données sont traitées et stockées par notre partenaire Payline qui est en conformité avec les normes PCI DSS.</p>
                  <h6>- Le paiement des achats en ligne</h6>
                    <p><span>Les données traitées :</span> Nom, prénom, email, téléphone, adresse postale, numéro de carte bancaire, adresse IP, système d’exploitation, type d’appareil utilisé.</p>
                    <p><span>La durée de conservation :</span>Les données (autres que vos informations bancaires) sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter. Les informations bancaires sont conservées 13 mois par notre prestataire de paiement.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous nous assurons que toutes les mesures techniques et organisationnelles soient mises en œuvre pour les protéger.</p>
                    <p><span>Destinataires des données :</span> En interne : Le service client Bish. En externe : Notre prestataire de paiement (Payline).</p>
                    <p>Bish n’a pas accès à vos informations bancaires. Ces données sont traitées et stockées par notre partenaire Payline qui est en conformité avec les normes PCI DSS.</p>
                  <h6>- Paiement des achats en magasin par chèque en utilisant le 3 fois sans frais</h6>
                    <p><span>Les données traitées : </span>Civilité, nom, prénom, date de naissance, département de naissance, adresse postale, banque. De manière facultative : justificatif d'identité, de domicile et de revenue.</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 mois après la dernière échéance, ce qui équivaut environ à 6 mois après la date de l’achat.</p>
                    <p><span>Destinataires des données :</span> Le service comptabilité de Bish.</p>
                    <p><span>Localisation du traitement : </span>Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger</p>
                    <p><span>Destinataires des données :</span> Le service comptabilité de Bish.</p>
                </li>
                <li>
                  <h5>Traitements opérés sur la base légale du consentement</h5>
                  <h6>- La création et gestion du compte client</h6>
                    <p><span>Les données traitées :</span> Civilité, nom, prénom, date de naissance, email, téléphone, adresse postale, adresse IP, Système d’exploitation mobile, type d’appareil utilisé, numéro de carte de fidélité, contenu des achats clients.</p>
                    <p><span>La durée de conservation :</span>Les données (autres que vos informations bancaires) sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter. Les informations bancaires sont conservées 13 mois par notre prestataire de paiement.</p>
                    <p><span>Localisation du traitement :</span>Les données sont conservées dans l’Union Européenne et nous nous assurons que toutes les mesures techniques et organisationnelles soient mises en œuvre pour les protéger.</p>
                    <p><span>Destinataires des données </span>En interne : Le service client Bish. En externe : Notre prestataire de paiement (Payline).</p>
                    <p>Bish n’a pas accès à vos informations bancaires. Ces données sont traitées et stockées par notre partenaire Payline qui est en conformité avec les normes PCI DSS.</p>
                  <h6>- La gestion de cookies publicitaires, de service et de performance.</h6>
                    <p>Rendez-vous sur l’onglet: Cookies en cliquant ici</p>
                  <h6>- La gestion du programme de fidélité</h6>
                    <p><span></span></p>
                  <h6>- La gestion du programme de fidélité</h6>
                    <p><span>Les données traitées :</span> Civilité, nom, prénom, date de naissance, prénom et âge des enfants, contenu des tickets ( articles et quantité achetés, date et d’achat ), date de création de la carte, nombre de points, signature électronique</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter</p>
                    <p><span>Destinataires des données :</span> Les services internes de Bish, tels que le service client, le service marketing, le service web et informatique et les équipes magasins. Les données sont également transmises à l’alliance aValiuz sauf si vous vous y êtes opposés (à l’exception des données concernant les personnes mineures.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                  <h6>- L’envoi d’offres commerciales par email ou sms</h6>
                    <p><span></span>Les données traitées : Nom, prénom, email, téléphone, Opt-in /Opt-out, date de consentement, Origine de la collecte, suivi des ouvertures des emails , suivi des clics sur les liens contenus dans les offres, pages web visitées après avoir cliqué sur le lien contenu dans l’email, fréquence d’envoi, préférences d’achat.</p>
                    <p><span></span>La durée de conservation : Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter.</p>
                    <p><span></span>Destinataires des données : En interne : Le service marketing. En externe : Vos données sont transmises à nos sous-traitants notamment pour piloter les envois des emails et de SMS. (cf onglet « Notre usage » pour en savoir plus).</p>
                    <p><span></span>Localisation du traitement : Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                  <h6>- L’organisation de jeux concours</h6>
                    <p><span>Les données traitées : </span>Civilité, nom, prénom, date de naissance, email, téléphone, photo (si casting), Opt-in Newsletter KIABI ou Opt-in du partenaire du jeu concours nommé, et gain</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter. S’il s’agit d’un jeu casting photo, les photos des participants sont conservées pendant 3 mois à compter de la fin du jeu, les photos des gagnants quant à elles sont conservées pendant 3 ans après la fin du jeu.</p>
                    <p><span>Destinataires des données :</span> En interne : Le service marketing. En externe : Vos données sont transmises au sous-traitant pilotant le jeu concours. Vos données peuvent également être transmises au partenaire du jeu concours qui est expressément mentionné à condition que vous nous ayez donné votre consentement.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                  <h6>─ L’enrichissement de la base de données Bish par des données provenant de partenaires (dans le cas où vous avez donné votre consentement au partenaire pour que vos données nous soient transférées).</h6>
                    <p><span>Les données traitées : </span>Civilité, nom, prénom, date de naissance, email, téléphone, opt-in newsletter, opt-in Sms, date du consentement, partenaire à l’origine de la collecte.</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter.</p>
                    <p><span>Destinataires des données :</span> Les services internes de Bish, tels que le service client ou encore le service marketing.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                  <h6>- Le transfert de vos données à des destinataires identifiés (sous réserve que vous nous ayez donné votre consentement lors de la collecte de vos données)</h6>
                    <p><span></span>Les données traitées : Civilité, nom, prénom, date de naissance, email, téléphone, Opt-in newsletter, Opt-in Sms, date du consentement.</p>
                    <p><span></span>La durée de conservation : Par Bish : Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter. Par le destinataire : Voir sa politique de conservation de données</p>
                    <p><span></span>Destinataires des données : En interne : Le service marketing. En externe : Le destinataire identifié lors de la collecte (ex : Disney). NB : Une fois les données transférées au destinataire, il devient alors responsable de traitement.</p>
                    <p><span></span>Localisation du traitement : Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger. Par le destinataire : Voir sa politique de conservation de données.</p>
                  <h6>- L’enregistrement et le traitement des candidatures RH envoyées auprès du Groupe Bish.</h6>
                    <p><span>Les données traitées :</span> Civilité, nom, prénom, date de naissance, email, de téléphone, données du CV et éventuellement des données sensibles (situation de handicap).</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 2 ans à compter de leur communication à Bish.</p>
                    <p><span>Destinataires des données :</span> En interne : Les services de recrutement Bish. En externe : Vos données sont transmises à nos sous-traitants notamment pour gérer notre plateforme de recrutement (cf onglet « Notre usage » pour en savoir plus).</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger. Dans certains cas de candidatures internationales, votre CV peut être visible par des recruteurs du groupe Bish situés en dehors de l’Union Européenne. Dans un tel cas, Bish met en œuvre toutes les garanties appropriées.</p>
                  <h6>- La création et la gestion du compte sur la Plateforme Communautaire KIABI</h6>
                    <p><span>Les données traitées :</span>Obligatoires : Civilité, nom, prénom , adresse mail, mot de passe, pseudonyme.</p>
                    <p><span>Facultatives :</span> Photo de profil, date de naissance, code postal, magasin de référence, présentation de lui-même.</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 ans à compter de la dernière connexion sur la Plateforme.</p>
                    <p><span>Destinataires des données :</span> Les services internes de Bish, tels que le service client, le service web et le service SITF. Les données sont également transmises à notre sous-traitant Toky Woky en charge de l’hébergement de la Plateforme.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                </li>
                <li>
                  <h5>Traitements opérés sur la base légale de de l'intérêt légitime poursuivi par KIABI</h5>
                  <h6>- La mesure de la satisfaction des clients sur nos services et produits</h6>
                    <p><span>Les données traitées :</span> Civilité, nom, prénom, date de naissance, email, téléphone, Opt-in newsletter, opt-in Sms, date du consentement.</p>
                    <p><span>La durée de conservation :</span> La durée de conservation des données collectées lors d’une enquête de satisfaction suite à un achat effectué en magasin ou sur le web est de 90 jours à compter de leur collecte. La durée de conservation des données collectées lorsque vous déposer un avis produit sur le web est de 3 ans.</p>
                    <p><span>Destinataires des données :</span> En interne : Le service marketing de Bish. En externe : Vos données sont transmises à nos sous-traitants notamment pour la gestion des outils de dépôt d’avis. (cf onglet « Notre usage » pour en savoir plus).</p>
                    <p><span>Localisation du traitement :</span> Vos données pourront être transférées aux Etats-Unis ou dans d’autres pays. Les garanties appropriées pour ce transfert sont mises en place. Ainsi, pour le transfert dans les pays hors de l’Union Européenne, Bish a signé les clauses contractuelles types adoptées par la commission européenne.</p>
                  <h6>- La vidéosurveillance en magasin (intérêt légitime et impérieux)</h6>
                    <p><span>Les données traitées :</span> Image des personnes, la date, l’heure et le lieu de collecte des images.</p>
                    <p><span>La durée de conservation :</span> Les images sont conservées pendant 1 mois à compter de leur enregistrement.</p>
                    <p><span>Destinataires des données :</span> En interne : Le personnel habilité du magasin. En externe : Notre prestataire chargé de la sécurité du magasin (cf onglet « Notre usage » pour en savoir plus). Les données peuvent également être transmises à la police dans le cadre d’une procédure.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger</p>
                  <h6>- La gestion des impayés et de la fraude sur le paiement en ligne (intérêt légitime et impérieux)</h6>
                  <p>Afin de se prémunir des impayés et de la fraude, Bish utilise un outil de contrôle des transactions, le 3D secure. Cet outil ne traite pas vos données personnelles, il se déclenche automatiquement selon un certain nombre de critères, afin de sécuriser la transaction. Bish tient une liste des clients ayant un impayé avéré et qui ne peuvent donc plus passer commande sur le site. Avant votre inscription sur cette liste, vous serez informé et Bish vous laissera un délai raisonnable pour régulariser la situation. Le traitement de vos données dans ces fichiers est réalisé comme suit :</p>
                    <p><span>Les données traitées :</span> Email, date d’inscription dans le fichier, date de la commande, numéro de transaction, montant de la transaction, moyen de paiement utilisé, département de livraison de la commande, identifiant client, IP client.</p>
                    <p><span>La durée de conservation :</span> En cas d’inscription sur cette liste, les données sont conservées pendant 2 ans. Les données sont supprimées 48h après la régularisation de l’impayé.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                    <p><span>Destinataires des données :</span> Le service de gestion des paiements et le service trésorerie.</p>
                  <h6>- Gestion du service client.</h6>
                  <p>Les conversations sont susceptibles d’être enregistrées lors de vos échanges téléphoniques avec le service client. Ces enregistrements sont aléatoires et ont pour finalité d’améliorer la qualité de notre service au client. Vous avez la possibilité de vous opposer à cet enregistrement en le faisant savoir au conseiller.</p>
                    <p><span>Les données traitées :</span> Nom, prénom, email, téléphone, ainsi que les données de votre compte et l’historique de vos achats en magasin et/ou en ligne ; les emails échangés et éventuellement la conversation téléphonique, le verbatim collecté lors des échanges d’emails.</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter. Les enregistrements des conservations téléphoniques sont conservés 1 mois.</p>
                    <p><span>Destinataires des données :</span> En interne : Le service client et le service concerné par la réclamation. En externe : Vos données sont transmises à nos sous-traitants notamment pour la gestion de la relation client. (cf onglet « Notre usage » pour en savoir plus).</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                  <h6>- La Gestion de la connaissance client et les analyses de préférence</h6>
                  <p>Ce traitement est visé à des fins d’amélioration et de personnalisation de la communication adressée ainsi que l’amélioration du parcours clients. Nous analysons vos préférences d’achat pour pouvoir vous offrir une expérience personnalisée lors de votre visite sur Bish.com ou bien vous envoyer des emails personnalisés (sous réserve que vous ayez donné votre consentement pour recevoir nos newsletters).</p>
                    <p><span>Les données traitées :</span> Nom, prénom, email, téléphone, données de compte client, historique d’ achats en magasin et/ou en ligne, segmentation en fonction des achats passés, et des parcours clients (ex : appétence pour les achats bébé ou pour les achats « mode »).</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter…</p>
                    <p><span>Destinataires des données :</span> En interne : le service client le service marketing. Les données sont également transmises à l’alliance Valiuz sauf si vous vous y êtes opposés.</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                  <h6>- La Gestion de la connaissance client et les analyses de préférence</h6>
                  <p>Ce traitement est visé à des fins d’amélioration et de personnalisation de la communication adressée ainsi que l’amélioration du parcours clients. Nous analysons vos préférences d’achat pour pouvoir vous offrir une expérience personnalisée lors de votre visite sur Bish.com ou bien vous envoyer des emails personnalisés (sous réserve que vous ayez donné votre consentement pour recevoir nos newsletters).</p>
                    <p><span></span>Les données traitées : Nom, prénom, email, téléphone, données de compte client, historique d’ achats en magasin et/ou en ligne, segmentation en fonction des achats passés, et des parcours clients (ex : appétence pour les achats bébé ou pour les achats « mode »).</p>
                    <p><span></span>La durée de conservation : Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter…</p>
                    <p><span></span>Destinataires des données : En interne : le service client le service marketing. Les données sont également transmises à l’alliance Valiuz sauf si vous vous y êtes opposés.</p>
                    <p><span></span>Localisation du traitement : Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                  <h6>- L’utilisation des réseaux sociaux et de Google pour réaliser des audiences personnalisées et mesurer les performances des publicités digitales sur les ventes en magasin</h6>
                  <p>Pour en savoir plus, rendez-vous à l’onglet « Utilisation des réseaux sociaux et Google ».</p>
                    <p><span></span>Les données traitées : Email pseudonymisé, téléphone pseudonymisé, date d’achat, magasin d’achat, montant des achats</p>
                    <p><span></span>Localisation du traitement : Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger. Vos données pourront être transférées aux Etats-Unis par les réseaux sociaux et Google. Les garanties appropriées pour ce transfert sont mises en place.</p>
                    <p><span></span>La durée de conservation : : Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion sur le compte web ou encore l’ouverture d’un lien contenu dans une newsletter.</p>
                    <p><span></span>Destinataires des données : En interne : Le service marketing. En externe : Vos données sont transmises aux réseaux sociaux et Google qui agissent en tant que sous-traitants. Ils ne pourront réutiliser les données que de manière anonymisées.</p>
                  <h6>- Personnalisation des publicités en ligne au bénéfice d’annonceurs tiers (extension d’audience)</h6>
                  <p>KIABI peut utiliser les données vous concernant afin de personnaliser la publicité qui vous sera diffusée sur son site ou sur des sites externes (exemple : sur les réseaux sociaux), pour le compte d’annonceurs tiers et sous réserve que vous ayez donné votre consentement aux cookies publicitaires. Aucune donnée personnelle n’est transmise aux annonceurs concernés.<br></br>A cette fin, Bish se fonde sur son intérêt légitime d’améliorer sa connaissance client pour établir un profil vous concernant et ainsi personnaliser les publicités grâce à la combinaison de vos données de navigation et des données que vous fournissez à l’occasion de vos interactions avec KIABI (vous pouvez vous opposer à ce traitement de données en nous adressant un email à dataprotectionofficer@kiabi.com).<br></br>KIABI peut utiliser dans ce cadre les services de son partenaire VALIUZ, agissant en qualité de responsable conjoint de traitement (cliquez ici vers la politique de confidentialité VALIUZ).</p>
                </li>
                <li>
                  <h5>Traitements opérés sur la base légale de l’information préalable et du droit d’opposition</h5>
                  <h6>- L’envoi de prospection commerciale par voie postale.</h6>
                    <p><span>Les données traitées : </span>Nom, prénom, adresse postale, préférence d’achats.</p>
                    <p><span>La durée de conservation :</span> Les données sont conservées 3 ans après le dernier contact avec Bish, par exemple : le dernier achat, la dernière connexion ou encore l’ouverture d’un lien contenu dans une newsletter…</p>
                    <p><span>Destinataires des données :</span> En interne : le service marketing. En externe : Vos données sont transmises à nos sous-traitants notamment pour l’envoi du courrier. (cf onglet « Notre usage » pour en savoir plus).</p>
                    <p><span>Localisation du traitement :</span> Les données sont conservées dans l’Union Européenne et nous mettons en œuvre toutes les mesures techniques et organisationnelles pour les protéger.</p>
                </li>
              </ul>
            </div>
          </div>
        <h4>Les principaux moments de collecte de données</h4>
          <div>
            <p>Les données peuvent être collectées à différents moments. Bish met tout en œuvre pour que cette collecte soit transparente et loyale.</p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(5)}>
                <label className='font-medium my-auto'>Collecte au travers du programme de fidélité Bish</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[5] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[5] ? "block" : "hidden"}>
            Pour vous inscrire au programme de fidélité Bish en magasin ou sur Bish.com, vous devez nous communiquer des informations vous concernant. Certaines de ces informations sont obligatoires comme votre nom, prénom, date de naissance, elles seront marquées par un astérisque ou indiquées comme tel par la conseillère de vente. D’autres sont facultatives, comme votre adresse postale, ou encore les prénoms et dates de naissance de vos enfants etc… Nous collectons également des données au fil de vos achats nous permettant d’analyser vos préférences. Une information sur le traitement effectué et sur vos droits vous sera donnée au moment de la collecte.
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(6)}>
                <label className='font-medium my-auto'>Collecte de données en magasin</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[6] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[6] ? "block" : "hidden"}>
            À l'occasion d'un achat ou d'un service en magasin, nous pouvons être amenés à recueillir certaines de vos informations personnelles afin de répondre à votre besoin. Par exemple lors d’un service retouche, la conseillère de vente devra recueillir vos coordonnées pour vous informer ensuite que votre produit est disponible en magasin. Les informations obligatoires seront marquées d'un astérisque ou indiqué comme tel par la conseillère de vente. Une information sur le traitement effectué et sur vos droits vous sera donnée au moment de la collecte.
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(7)}>
                <label className='font-medium my-auto'>Collecte sur le site Bish.com ou sur l’application mobile Bish</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[7] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[7] ? "block" : "hidden"}>
              Pour que vous puissiez réaliser des achats sur kiabi.com nous devons recueillir certaines de vos informations afin de pouvoir gérer votre commande, telles que votre nom, prénom ou encore votre adresse de livraison. Certaines de ces informations sont obligatoires et sont marquées d'un astérisque. Nous collectons également des données au fil de vos achats nous permettant d’analyser vos préférences. Une information sur le traitement effectué et sur vos droits vous sera donnée au moment de la collecte.
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(8)}>
                <label className='font-medium my-auto'>Collecte sur la Plateforme Communautés</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[8] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[8] ? "block" : "hidden"}>
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(9)}>
                <label className='font-medium my-auto'>Collecte au travers du programme de fidélité Bish</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[9] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[9] ? "block" : "hidden"}>
            Afin de vous identifier, d’interagir avec vous et d’animer l’activité sur la Plateforme Communautés, nous devons recueillir certaines de vos informations telles que votre nom, prénom ou encore votre pseudonyme.
            Certaines de ces informations sont obligatoires et sont marquées d'un astérisque. Une information sur le traitement effectué et sur vos droits vous sera donnée au moment de la collecte.
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(10)}>
                <label className='font-medium my-auto'>Collecte lors de jeux concours</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[10] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[10] ? "block" : "hidden"}>
            Lorsque Bish organise des jeux concours, elle doit recueillir certaines de vos informations personnelles, comme par exemple votre nom, prénom, adresse email ou encore votre date de naissance afin de pouvoir enregistrer votre participation. Certaines de ces informations sont obligatoires et sont marquées d'un astérisque. Une information sur le traitement effectué et sur vos droits vous sera donnée au moment de la collecte.
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(11)}>
                <label className='font-medium my-auto'>Collecte indirecte</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[11] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[11] ? "block" : "hidden"}>
            Bish peut être amenée à recueillir certaines de vos données de manière indirecte. Ces données proviennent de partenaires de Bish à qui vous avez donné votre accord pour que vos données soient transférées à Bish afin de recevoir nos newsletters par exemple.
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(12)}>
                <label className='font-medium my-auto'>Collecte lors de votre navigation sur le site</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[12] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[12] ? "block" : "hidden"}>
            Nous utilisons des « cookies » qui permettent d’obtenir des informations sur votre navigation. Pour plus d’informations, rendez-vous à l’onglet cookies.
            </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(13)}>
                <label className='font-medium my-auto'>Collecte lors de votre dépôt de candidature pour un poste au sein du Groupe Bish</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[13] ? 'rotate-180':''} h-8`} />
            </button>
            <p className={isOpen[13] ? "block" : "hidden"}>
            Afin de pouvoir enregistrer votre candidature, nous devons collecter un certain nombre d’informations vous concernant telles que, votre prénom, votre nom, votre adresse email ou encore votre curriculum vitae. Certaines de ces informations sont obligatoires et sont marquées d'un astérisque. Une information sur le traitement effectué et sur vos droits vous sera donnée au moment de la collecte.
            </p>
          </div>
          <h4>L'usage des données :</h4>
          <div>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(14)}>
                <label className='font-medium my-auto'>La sécurité de la navigation</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[14] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[14] ? "block" : "hidden"}>
              Toutes les pages de www.kiabi.com sont sécurisées et cryptées, notamment les pages de collecte de vos données. Vous pouvez le vérifier en regardant l'adresse de la page : un cadenas apparaît avant ou après le mot KIABI (KIABI EUROPE) [FR] ; selon votre navigateur.
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(14)}>
                <label className='font-medium my-auto'>La sécurité de la navigation</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[14] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[14] ? "block" : "hidden"}>
              Toutes les pages de www.kiabi.com sont sécurisées et cryptées, notamment les pages de collecte de vos données. Vous pouvez le vérifier en regardant l'adresse de la page : un cadenas apparaît avant ou après le mot KIABI (KIABI EUROPE) [FR] ; selon votre navigateur.
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(15)}>
                <label className='font-medium my-auto'>La sécurité de stockage des données</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[15] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[15] ? "block" : "hidden"}>
            Bish prend toutes les précautions pour préserver la sécurité de vos données afin notamment, d’empêcher leur divulgation à des tiers non-autorisés. A ce titre Bish met en place toutes les mesures nécessaires à la sécurisation de ses dispositifs informatiques et de ceux de ses sous-traitants. Nous attirons votre attention sur le fait que Bish n’est pas responsable du stockage et du traitement des informations liées à votre carte bancaire et de vos informations bancaires. Ces données sont exclusivement traitées par notre partenaire Payline qui est en conformité avec les normes PCI DSS et qui est tenu de respecter les obligations relatives à l’utilisation, au traitement et au stockage de données personnelles.
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(16)}>
                <label className='font-medium my-auto'>Notre usage</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[16] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[16] ? "block" : "hidden"}>
              <h4>Le destinataire de vos données:</h4>
              <ul>
                <li><span>- Les Sous-Traitants</span>Nous pouvons être amenés à transmettre vos données à des sous-traitants afin de réaliser les services proposés. Dans un tel cas, Bish reste responsable de l’usage de vos données qui sera fait par les sous-traitants et s’assure de leur respect des normes en vigueur. Notamment, Bish met tout en œuvre pour s’assurer de leur respect des normes de sécurité. A titre d’exemple, vous trouverez ci-après une liste non exhaustive de catégories de sous-traitants avec lesquels nous travaillons :
                - Des sous-traitants informatiques et techniques (maintenance, hébergement du site …)
                - Des sous-traitants ayant en charge la relation client (call center, avis sur les produits…)
                - Des sous-traitants marketing (gestion des jeux concours, envoie des newsletters…)</li>
                <li><span>- Les partenaires</span>Bish pourra transmettre vos données à des partenaires dans les cas suivants :
                  • Dans le cadre de notre activité, pour vous assurer les meilleurs services comme la livraison de vos produits ou encore le paiement des commandes.
                  • Dans le cas où une autorité administrative ou judiciaire compétente en ferait la demande. Lorsque Bish transmet vos données à des partenaires et lorsque cela est possible, elle s’assure que ces derniers respectent des engagements aussi contraignants que ceux qu’elle s’impose à elle-même.
                  Par ailleurs, si vous effectuez trois achats consécutifs avec votre carte de fidélité, sur trois jours différents dans un magasin Bish tenu par un affilié (commerçant indépendant), alors vos données pourront leur être transférées. Lorsque vos données sont transférées à un partenaire, alors une fois le transfert réalisé, le partenaire devient responsable de traitement de vos données.</li>
              </ul>
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(17)}>
                <label className='font-medium my-auto'>Client situés à la Réunion ayant adhéré au programme de fidelite</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[17] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[17] ? "block" : "hidden"}>
              Afin de vous offrir le meilleur service et une utilisation de la carte de fidélité dans les magasins Bish de nos franchisés dans les DOM-TOM et sur www.kiabi.com ; dans les cas de création de carte ou d’utilisation de carte en magasin, la société de notre franchisé, transmettra les données à caractère personnel collectées grâce au système fidélité à Bish. A l’inverse, dans les cas de création de carte ou d’utilisation de carte sur www.kiabi.com, Bish, transmettra les données à caractère personnel collectées grâce au système fidélité, à la société de notre franchisé Vous pouvez vous opposer à ce transfert à l’adresse suivante : dataprotectionofficer@kiabi.com . Ces transferts de données se feront de manière sécurisée. La société franchisée et Bish seront ainsi chacune responsable du traitement de vos données sur leurs bases de données respectives.
              Pour la Réunion :
              Pour exercer vos droits d'accès, de rectification, de portabilité, de limitation, d’effacement, de transmission de directives anticipées et d’opposition aux traitements des données vous concernant auprès de la société Ravate Tissus, société franchisée de Bish, contactez 0262 23 49 00 ou supmarketing.kiabi@ravate-tissus.fr .
              Pour la Guadeloupe, Martinique et Guyane : Pour exercer vos droits d'accès, de rectification, de portabilité, de limitation, d’effacement, de transmission de directives anticipées et d’opposition aux traitements des données vous concernant. Contactez marketing.kiabi@sharko.fr
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(18)}>
                <label className='font-medium my-auto'>L'alliance VALIUZ</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[18] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[18] ? "block" : "hidden"}>
              L’alliance VALIUZ
              KIABI est membre de l’alliance VALIUZ.
              VALIUZ réunit un ensemble d’entreprises autour de la connaissance client dans le but de les aider à personnaliser leurs offres et leurs communications et de contribuer à personnaliser la publicité en ligne.

              VALIUZ est une société codétenue par KIABI. Pour consulter la liste des entreprises participantes de l’alliance, cliquez ici.
              Quel est le service fourni par VALIUZ ?

              Grâce à VALIUZ, les entreprises qui vous connaissent (par exemple parce que vous êtes déjà leur client ou inscrit à leur newsletter) peuvent partager de manière sécurisée les informations relatives à vos centres d’intérêts et vos habitudes d’achat, ce pour les finalités suivantes:
            </p>

          </div>
        <h4>La publicité chez Bish :</h4>
          <div>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(19)}>
                <label className='font-medium my-auto'>Courrier papiers</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[19] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[19] ? "block" : "hidden"}>
              En magasin ou sur Bish.com, nous pouvons être amenés à collecter votre adresse postale. Vous pouvez donc par la suite recevoir des offres de la part de Bish par courrier postal adressé à votre nom.
              Vous pouvez à tout moment vous opposer à recevoir de la prospection commerciale par voie postale :

              En contactant le service client en cliquant ici
              En vous rendant sur votre espace client sur l’onglet « Mes abonnements »
              En vous adressant à une conseillère de vente en magasin
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(20)}>
                <label className='font-medium my-auto'>Email et sms</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[20] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[20] ? "block" : "hidden"}>
              Vous avez la possibilité de vous abonner aux offres Bish en inscrivant à notre newsletter Bish ou à l’envoi de SMS.
              Nous vous demandons toujours votre consentement sous une forme équivalente à celle-ci :


              - Email: Je souhaite recevoir les offres de Bish par mail (promos, ventes privées, concours…)
              Vous pouvez à tout moment retirer votre consentement pour recevoir ces offres :

              En cliquant sur le lien contenu dans le footer de l’email « Pour vous désabonner, cliquez ici. »
              En vous rendant sur votre espace client sur l’onglet « Mes abonnements »
              En contactant le service client en cliquant ici
              - Sms : Je souhaite recevoir les bon plans Bish par SMS
              Vous pouvez à tout moment retirer votre consentement pour recevoir ces offres :

              Chaque SMS vous informera de la possibilité d'un désabonnement « STOP SMS » à un numéro non surtaxé.
              En vous rendant sur votre espace client sur l’onglet « Mes abonnement »
              En contactant le service client en cliquant ici
              En vous adressant à une conseillère de vente en magasin
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(21)}>
                <label className='font-medium my-auto'>Utilisation des réseaux sociaux et google</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[21] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[21] ? "block" : "hidden"}>
              Le ciblage publicitaire par typologie de public

              - Vous pouvez avoir accès à de la publicité ciblée sur Facebook et Instagram. En effet, Bish utilise un service de Facebook et Instagram, via lequel elle demande à Facebook ou Instagram de cibler un certain public selon des thématiques prédéfinies et en fonction de l’activité des utilisateurs sur Facebook ou Instagram. Par exemple, Bish peut demander à Facebook de faire apparaitre une publicité sur l’offre femme à tous les utilisateurs Facebook aimant la mode femme (qui ont liké la page d’une enseigne mode femme par exemple). Vous pouvez vous opposer à la réception de ce type de publicité en vous rendant sur votre profil Facebook, rubrique « Activité hors Facebook ».

              Les audiences personnalisées

              - Bish utilise également un service proposé par les réseaux sociaux tels que Facebook ainsi que par Google, permettant d’exposer des publicités Bish sur le réseau social ou sur Google à une population de personnes déterminée selon les critères d’activité chez KIABI. Par exemple, KIABI pourrait demander à Facebook d’exposer à la publicité ses clients qui ont acheté dans le rayon femme dans les 3 derniers mois

              Pour cela, Bish transmet votre adresse email ou votre numéro de téléphone pseudonymisé (une suite de code) au réseau social ou à Google, qui vérifie s’il détient lui aussi cette suite de code via une clé de lecture (le réseau social et Google ne voient pas votre adresse email/numéro de téléphone).
              Dans le cas où les suites de code sont concordantes, alors vous verrez apparaitre cette publicité. A l’inverse, si le réseau social ou Google ne détecte pas de concordance, alors vous ne verrez pas cette publicité. Par ailleurs, le réseau social et Google ne pourront pas obtenir votre adresse email ou votre numéro de téléphone par ce procédé. Bish ne transfère pas vos données nominatives au réseau social et à Google. Vous pouvez exercer votre droit d’opposition à faire partie de ces audiences personnalisées à l’adresse suivante : dataprotectionoffier@kiabi.com.

              Les outils d’analyse de l’influence du digital sur les achats en magasin

              - Bish utilise un service proposé par Facebook et Google permettant de mesurer la performance des campagnes publicitaires sur le chiffre d’affaires des magasins. Ainsi, Bish pourra savoir si les achats réalisés par nos clients en magasins ont été influencés par une publicité Bish sur Facebook ou sur Google (Youtube, moteur de recherche etc…) afin de mesurer l'impact omnicanal de ses publicités digitales.
              Pour cela, Bish transmet à Facebook ou Google :
              o Votre adresse email ou votre numéro de téléphone pseudonymisés (une suite de code)
              o Le nom du magasin dans lequel vous avez effectué un achat
              o Le montant et la date de l’achat
              Facebook et Google vérifient ensuite s’ils détiennent cette suite de code via une clé de lecture (ils ne voient pas votre adresse email/numéro de téléphone) et si vous avez étaient exposés à une publicité Bish ou non dans la période indiquée. Le cas échéant, Facebook et Google mesurent la rentabilité de cette publicité par rapport au montant des achats effectués par les clients. Si vous ne leur avez jamais communiqué, Facebook et Google ne pourront pas obtenir votre adresse email ou votre numéro de téléphone par ce procédé. Bish ne transfère pas vos données nominatives au réseau social et à Google.

              - Vous pouvez exercer votre droit d’opposition à faire partie de mesures de performance à l’adresse suivante : dataprotectionoffier@kiabi.com
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(22)}>
                <label className='font-medium my-auto'>Notification push</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[22] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[22] ? "block" : "hidden"}>
              Si vous avez téléchargé l’application Bish, vous pouvez recevoir des notifications sur votre mobile (par exemple, la disponibilité de votre colis en zone de retrait magasin). Vous pouvez choisir de ne pas recevoir de notification, en les refusant lors du téléchargement de l’application ou lors de la première utilisation, ou vous pouvez à tout moment désactiver les notifications dans les paramétrages de votre mobile ou tablette.
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(23)}>
                <label className='font-medium my-auto'>Contact non publicitaire</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[23] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[23] ? "block" : "hidden"}>
              Bish peut être amené à vous contacter par téléphone, email, SMS ou encore courrier notamment pour les raisons suivantes :

              Pour le suivi ou préparation de votre commande
              En cas de retrait produit
              Pour l’organisation de tables rondes avec des clients
            </p>
          </div>
        <h4>Vos droits :</h4>
        <div>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(24)}>
                  <label className='font-medium my-auto'>Le détail de vos droits</label>
                  <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[24] ? 'rotate-180':''} h-8`} />
            </button>
              <p className={isOpen[24] ? "block" : "hidden"}>
                Le droit d'accès : : Il s’agit du droit d'obtenir la communication de toutes les informations vous concernant détenues par KIABI.

                Le droit de rectification : Il s’agit du droit d'obtenir la rectification des informations inexactes vous concernant détenues par KIABI.

                Le droit à l’oubli: Il s’agit du droit d'obtenir la suppression des informations vous concernant détenues par KIABI. Toutefois, KIABI ne sera pas tenu d’effacer les données qu’elle doit conserver dans le cadre d’une obligation légale (ex : les données de facturation).

                Le droit d'opposition : Il s’agit du droit de vous opposer au traitement de vos données. Lors de l’exercice de votre droit d’opposition, vous devez mettre en avant « des raisons tenant à votre situation particulière » expliquant votre demande sauf en matière de prospection commerciale, à laquelle vous pouvez vous opposer sans motif. Toutefois, vous ne pourrez pas exercer votre droit d’opposition dans le cas où le traitement est fondé sur un motif légitime impérieux, sur un contrat (commande sur Bish.com ou achat en magasin), et enfin sur une obligation légale de Bish.

                Le droit de limitation du traitement : : Il s’agit du droit qui vient compléter l’exercice de vos autres droits. En effet, Bish dispose d’un mois pour répondre à l’exercice de votre droit de rectification ou d’opposition et peut prolonger ce délai si la demande est complexe ou nécessite une étude complémentaire. C’est dans cette période de prolongation que Bish doit geler les données concernées et ne plus les utiliser et donc limiter le traitement. Vous pouvez également exercer ce droit si vous ne souhaitez pas que l’on supprime certaines de vos données conformément aux durées de conservation définies afin de pouvoir les utiliser dans le cadre d’une procédure.

                Le droit à la portabilité : Il s’agit du droit d'obtenir que vos données à caractère personnel soient transmises dans un format structuré directement d'un responsable de traitement à un autre, lorsque cela est techniquement possible.

                Le droit d'introduire une réclamation auprès d'une autorité de contrôle : Pour plus d'informations concernant l'exercice de vos droits : https://www.cnil.fr/fr/comprendre-vos-droits
              </p>
            <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(25)}>
                  <label className='font-medium my-auto'>L'exercice de vos droits</label>
                  <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[25] ? 'rotate-180':''} h-8`} />
            </button>
              <p className={isOpen[25] ? "block" : "hidden"}>
                Vous pouvez exercer vos droits par email à contact@kiabi.com et en cas de difficultés à dataprotectionofficer@kiabi.com ou en écrivant à KIABI – D.P.O - 100 rue du Calvaire, HEM (59510) France. Une réponse vous sera alors adressée dans un délai de 1 mois suivant la réception de la demande.
                Pour exercer vos droits vous devez justifier de votre identité par tout moyen. En cas de doute raisonnable, une pièce d’identité pourrait vous être demandée.
                Pour exercer votre droit d’opposition à recevoir des offres commerciales, vous pouvez vous reporter à l’onglet « Email et SMS ».
              </p>
        </div>
        <h4>Les cookies</h4>
        <div>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(26)}>
                <label className='font-medium my-auto'>La définition</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[26] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[26] ? "block" : "hidden"}>
              Qu'est-ce qu'un cookie ?
              Bish et ses partenaires utilisent des cookies. Un cookie est un petit fichier de texte qui est placé sur votre ordinateur, votre appareil mobile ou tout autre dispositif afin de recueillir des données concernant votre navigation.

              Certains cookies fonctionnels sont nécessaires pour faciliter la navigation lors de vos achats en ligne et pour la rendre plus agréable. Grâce aux cookies, vous avez accès à des fonctionnalités personnalisées et nous avons la possibilité, par exemple, de vous identifier ou de rappeler vos préférences pendant la navigation et lors de futures visites. De plus, la lecture des cookies nous permet d'améliorer le site Bish.com, de connaître l'affluence et la fréquence de visiteurs afin notamment de s'assurer que le site Bish.com fonctionne correctement et rapidement.

              Les cookies qui ne sont pas strictement nécessaires à votre navigation, autrement dit les cookies autres que ceux qui sont fonctionnels, ne seront pas déposés sans votre consentement exprès. Pour cela rendez-vous à l’onglet « Maitrise des cookies ».

              Les cookies sont-ils dangereux ?
              Les cookies ne causent aucun dommage à votre ordinateur et ne peuvent pas être porteurs de virus. Ils ne peuvent pas s'exécuter automatiquement. De plus, les cookies ne collectent aucune information contenue sur votre ordinateur ou dans vos fichiers personnels.
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(27)}>
                <label className='font-medium my-auto'>Les données collectées</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[27] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[27] ? "block" : "hidden"}>
              Les cookies permettent de collecter des données lors de votre navigation telles que : votre identifiant cookies ou mobile, l’adresse IP, les pages visitées, les produits consultés, type d’appareil utilisé, les données de votre panier d’achat, la langue de navigation, ou encore les termes recherchés dans notre moteur de recherche.
              Nos cookies ne servent pas à stocker des informations d'identification personnelle sensibles, comme votre adresse, votre mot de passe, ou les données de votre carte de crédit.
            </p>
        <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(28)}>
                <label className='font-medium my-auto'>La maitrise des cookies</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[28] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[28] ? "block" : "hidden"}>
              Comment maîtriser les dépôts de cookies ?
              En cliquant sur Gérer le dépôt des cookies vous arriverez sur notre plateforme de gestion de vos consentements aux cookies et, vous pouvez accepter/refuser le dépôt des cookies selon leur finalité.
              Le paramétrage de vos choix liés au dépôt des cookies se fait via un cookie. Ainsi, il sera nécessaire de paramétrer vos choix sur chaque appareil et chaque navigateur que vous utiliserez pour vous connecter au site Bish et de faire un nouveau paramétrage si vous procédez à la suppression de vos cookies sur un de vos appareil.
              Nous conservons vos choix pendant 6 mois.Vous pouvez à tout moment les modifier.

              Gérer le dépôt des cookies
              Combien de temps sont conservés les cookies ?
              Les cookies sont conservés 13 mois à compter de leur dépôt.

              Le référencement des cookies
              • Les cookies fonctionnels : Les cookies fonctionnels et techniques sont strictement nécessaires pour fournir nos services et ne peuvent pas être désactivés. Ces cookies ne collectent pas d’information d’identification personnelle. Ce sont par exemple les cookies permettant de conserver les produits dans votre panier.
              Certaines de ces cookies sont déposés par les partenaires de Bish listés ci-dessous. Pour plus d’informations sur l’utilisation des données collectées par les cookies par ces partenaires, nous vous invitons à aller consulter leur politique de confidentialité disponible sur les liens indiqués. Dans le cas où vous souhaitez exercer vos droits auprès de ces partenaires, vous pouvez les contacter directement.
              • Les cookies de publicité personnalisée :
              Bish utilise des traceurs afin d’afficher de la publicité personnalisée en fonction de votre navigation et de votre profil. Certains de ces cookies sont déposés par les partenaires de Bish listés ici
              Entre autres, Bish et l’alliance VALIUZ utilisent des cookies et technologies similaires permettant de combiner vos données de navigation sur les sites des membres de l’alliance avec les données liées à votre compte client ouvert auprès des membres de l’alliance afin de personnaliser les publicités diffusées sur leur site ou sur des sites externes, notamment des réseaux sociaux, pour le compte des membres de l’alliance et pour le compte d’annonceurs tiers.” Pour plus d’informations sur l’utilisation des données collectées par les cookies par ces partenaires, nous vous invitons à aller consulter leur politique de confidentialité disponible sur les liens indiqués. Dans le cas où vous souhaitez exercer vos droits auprès de ces partenaires, vous pouvez les contacter directement.

              • Les cookies de performance :Bish utilise des solutions d’optimisation et de suivi de navigation pour améliorer l’expérience, comprendre les besoins et optimiser la navigation.
              Certains de ces cookies sont déposés par les partenaires de Bish ici. Pour plus d’informations sur l’utilisation des données collectées par les cookies par ces partenaires, nous vous invitons à aller consulter leur politique de confidentialité disponible sur les liens indiqués. Dans le cas où vous souhaitez exercer vos droits auprès de ces partenaires, vous pouvez les contacter directement.
              • Les cookies de réseaux sociaux : Notre site vous propose de vous identifier via vos identifiants de réseaux sociaux. Ces cookies sont déposés par les partenaires de Bish listés ici. Pour plus d’informations sur l’utilisation des données collectées par les cookies par ces partenaires, nous vous invitons à aller consulter leur politique de confidentialité disponible sur les liens indiqués. Dans le cas où vous souhaitez exercer vos droits auprès de ces partenaires, vous pouvez les contacter directement.
              • Les cookies de personnalisation de contenu : Nos sites et applications utilisent des cookies pour personnaliser l’affichage de nos produits et services en fonction de ceux que vous avez précédemment consultés ou achetés. Ces cookies sont créés et gérés directement par Bish.
            </p>
          <button className='flex justify-between w-full' id="div1" onClick={() => handleClick(29)}>
                <label className='font-medium my-auto'>Le cookie de l'alliance VALIUZ</label>
                <img src={arrow} alt="Dérouler la réponse" className={`${isOpen[29] ? 'rotate-180':''} h-8`} />
          </button>
            <p className={isOpen[29] ? "block" : "hidden"}>
              Le cookie déposé sur les sites et applications mobiles des membres de l’alliance permet à VALIUZ de collecter vos informations de navigation sur les sites internet des membres de l’alliance (pages visitées, produits consultés et achetés). Ces informations sont rapprochées des données que vous avez fournies aux membres de l’alliance (exemple: tranche d’âge, historique d’achats en magasin, etc.) et viennent compléter votre profil pour les finalités visées ci-dessus.
              Pour faire le rapprochement entre vos données détenues par les membres de l’alliance et vos données de navigation sur Internet, VALIUZ utilise le service de la société Mediarithmics qui, à l’aide d’un identifiant digital (cookie), permet de vous reconnaître. La création de cet identifiant (de type “XXX”) est réalisée par Médiarithmics en qualité de responsable de traitement. La collecte de cet identifiant généré par le cookie Mediarithmics lorsque vous naviguez sur notre Site constitue un traitement dont KIABI et Mediarithmics sont responsables conjoints. Mediarithmics traite ensuite cet identifiant afin de le confronter à sa table de réconciliation. Cette opération lui permet de confirmer qu’un même navigateur a été identifié sur le site de plusieurs de ses clients, et pour VALIUZ sur le site des membres de l’alliance. Mediarithmics est responsable de traitement de cette table de correspondance. Pour plus d'informations sur le traitement de réconciliation réalisé par Mediarithmics, consultez la politique de protection des données de Mediarithmics accessible ici.
              Les données de navigation collectées par le cookie VALIUZ sont conservées 12 mois maximum.
            </p>
        </div>
      </div>

  )
}
export default RGPDView

