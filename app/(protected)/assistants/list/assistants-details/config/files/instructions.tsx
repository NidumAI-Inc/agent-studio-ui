import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Instructions() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="my-4 p-4 rounded-xl border bg-background/30 @container">
        <AccordionTrigger className="p-0 text-lg font-medium text-left">Instructions for Optimizing RAG Document Retrieval</AccordionTrigger>
        <AccordionContent className="pt-4">
          <ul>
            <li className="mb-1 text-sm text-foreground/80">1. Use clear headings and structure to enable easy navigation.</li>
            <li className="mb-1 text-sm text-foreground/80">2. Start each section with a concise summary of the content.</li>
            <li className="mb-1 text-sm text-foreground/80">3. Highlight key search terms like product names, IDs, and FAQs.</li>
            <li className="mb-1 text-sm text-foreground/80">4. Maintain a clean, readable format for better information extraction.</li>
            <li className="mb-1 text-sm text-foreground/80">5. Use bullet points to simplify complex ideas.</li>
            <li className="mb-1 text-sm text-foreground/80">6. Avoid jargon; provide clear explanations for technical terms.</li>
            <li className="mb-1 text-sm text-foreground/80">7. Break up dense text into shorter, more digestible paragraphs.</li>
            <li className="mb-1 text-sm text-foreground/80">8. Include a table of contents for quick access in larger documents.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Instructions
