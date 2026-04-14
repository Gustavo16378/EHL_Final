import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Como faço para me inscrever nas corridas?", a: "Acesse nosso site, escolha o evento desejado na seção 'Próximas Corridas' e clique em 'Inscreva-se'. Você será direcionado para a página de inscrição." },
  { q: "Quais formas de pagamento são aceitas?", a: "Aceitamos cartão de crédito, débito, PIX e boleto bancário." },
  { q: "Como posso organizar uma corrida com a LCM?", a: "Entre em contato conosco pelo formulário abaixo ou pelo WhatsApp. Nossa equipe fará uma consultoria completa para planejar e executar seu evento esportivo." },
  { q: "Onde acontecem os eventos?", a: "Nossos eventos acontecem principalmente em Palmas e outras cidades do Tocantins. Consulte a agenda para locais específicos." },
  { q: "Posso participar como patrocinador?", a: "Claro! Estamos sempre abertos a novas parcerias. Entre em contato conosco para discutir oportunidades de patrocínio." },
  { q: "Os eventos possuem suporte médico?", a: "Sim, todos os nossos eventos contam com equipe médica, hidratação e suporte completo para a segurança dos participantes." },
];

const FAQSection = () => (
  <section id="faq" className="min-h-screen flex flex-col justify-center py-24 bg-secondary">
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
      <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Dúvidas</p>
      <h2 className="font-display text-4xl md:text-6xl text-foreground text-center mb-16">
        Perguntas <span className="text-accent">frequentes</span>
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-border rounded-xl bg-card px-6 data-[state=open]:border-accent/40"
          >
            <AccordionTrigger className="font-body font-semibold text-foreground text-left py-5 hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="font-body text-muted-foreground pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
