import Carousel from "./carrousel";

const items = [
  {
    title: "Inovações na Plataforma",
    description: "Atualizações na plataforma e novidades para você explorar.",
    image: "https://tse4.mm.bing.net/th/id/OIP.eXMirNrTiqU9ji37SC1FfQHaEC?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Comunidade em Crescimento",
    description: "Nossa comunidade está crescendo! Junte-se a outros entusiastas e compartilhe suas experiências.",
    image: "https://tse2.mm.bing.net/th/id/OIP.EcVWLnZEV19ix0rB-2728QHaEE?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Eventos e Webinars",
    description: "Participe de nossos eventos e webinars para se manter atualizado.",
    image: "https://th.bing.com/th/id/R.e8d861ee77667c4739bdf930cd317559?rik=H1Mf6ckAWIEULw&riu=http%3a%2f%2fwww.aplausoeventos.com.br%2fwp-content%2fuploads%2f2019%2f04%2feventos-2-768x512.png&ehk=7pgY7TbmI6oUmbtdSRnIvnxpeT0UwE4xtzYYn5TkNWg%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    title: "Serviço de Suporte 24/7",
    description: "Estamos aqui para ajudar! Nosso serviço de suporte está disponível 24/7 para resolver suas dúvidas.",
    image: "https://img.freepik.com/fotos-premium/centro-de-chamadas-em-casa-e-mulher-consultor-ou-agente-para-comunicacao-aconselhamento-on-line-e-suporte-na-web-agencia-virtual-pensamento-e-jovem-com-e-learning-perguntas-frequentes-contato-educacional-ou-aconselhamento-universitario_590464-208959.jpg",
  },
]

export default function CarouselWS() {
  return (
    <Carousel slides={items}/>
  );
}