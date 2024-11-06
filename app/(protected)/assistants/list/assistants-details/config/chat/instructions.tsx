import { useAgentsList } from "@/hooks/use-agents";
import { useUser } from "@/hooks/use-user";

import MarkdownParse from "@/components/mark-down-preview";

const template = (agent: string, id: string, phone: string) => {
  return `
# Bot Widget Integration Guide

Follow these steps to integrate the bot widget into your website or application.

## Step 1: Copy the Script Code

Insert the following code into your website:

\`\`\`html
<script
 src="https://bot-widget-ivory.vercel.app/widget.iife.js"
 data-id="${id}"
 data-phone_number="${phone}"
 data-assistant_name="${agent}"
></script>
\`\`\`

## Step 2: Add Script to Your Website

1. Place the updated \`<script>\` tag in your website's HTML file:
   - Insert it in the \`<head>\` section **or** just before the closing \`</body>\` tag.

2. **Save** your changes.

## Step 3: Verify Integration

1. **Reload your website** and check for the bot widget on the page.
2. **Interact** with the bot to confirm that it is working as expected.
`
}

type props = {
  id: string
}

function Instructions({ id }: props) {
  const { userId } = useUser()
  const { data } = useAgentsList()

  const found = data?.find((d: any) => d.id === id)

  if (!found) return null

  return (
    <MarkdownParse
      response={template(found?.agent_name, `${userId}_${found?.id}`, found?.phone_number)}
    />
  )
}

export default Instructions
