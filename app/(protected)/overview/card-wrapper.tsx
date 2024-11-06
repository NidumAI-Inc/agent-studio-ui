import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type props = {
  title: string
  children: ReactNode
  className?: string
}

function CardWrapper({ title, children, className = "" }: props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className=" text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default CardWrapper
