import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'What is Nursana?',
    answer:
      'Nursana is a platform that connects nurses with hospitals and health systems. Our AI-driven vetting process identifies top talent based on skills and connects them with the best opportunities.',
  },
  {
    question: 'What is AI-driven resume & interview feedback? ',
    answer:
      "Traditional, human-driven hiring processes often overlook deserving candidates, rejecting them unfairly if their resumes lack standout credentials. We aim to level the playing field by uncovering unique skills beyond the resume so that every candidate gets the best opportunity to get hired. A central component to our vetting process is the AI interview, where our AI system asks tailored questions about each candidate’s background to uncover skills and determine the roles they're best suited for. Companies can then review these skill summaries and AI interviews, making it easy to identify the ideal profiles for their hiring needs.",
  },
  {
    question: 'How does the process work? ',
    answer:
      "Once you satisfactorily complete your interview, your profile will be reviewed and you will join our talent network. Our AI then scours our employer network to match you with the best opportunities, based on your preferences and skills. You can choose to accept or decline any outreach to further guide our AI and refine your search.",
  },
  {
    question: 'What is unique about Nursana’s AI?',
    answer:'Our AI is specific to nursing and healthcare, thus providing more accuracy. We use several techniques to fine-tune our models, including, but not limited to Supervised fine-tuning (SFT), Parameter-Efficient Fine-Tuning (PEFT), Reinforcement learning with human feedback (RLHF), and others. We continue to evaluate our AI and further refine based on advancements in AI.',
  },
  {
    question: 'Will I work for Nursana? ',
    answer:'No, you will work directly for the hospital, health system, or employer that presents you with the job offer. Nursana is a talent network that matches exceptionally talented nurses with the best opportunities. ',
  },
  {
    question: 'Do I have to do more interviews? ',
    answer:'Our AI-interview is a way to open doors to conversations and the employers will run their own hiring processes to ultimately hire.',
  },
  {
    question: 'Do nurses have to pay for your software?',
    answer:'No, our software is completely free for nurses',
  },
];

export function Faqs() {
  return (
    <div className='max-w-3xl flex flex-col md:items-center md:gap-8 gap-4 mx-auto w-full px-5'>
    <h1 className='text-2xl font-medium md:text-4xl'>
            Frequently Asked Questions
          </h1>
    <Accordion type='single' collapsible className='w-full'>
      {faqData.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger className='text-lg text-left'>{item.question}</AccordionTrigger>
          <AccordionContent className='text-lg'>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    </div>
  );
}
