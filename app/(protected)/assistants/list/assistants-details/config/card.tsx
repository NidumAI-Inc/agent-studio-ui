
type CardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
}

function Card({ title, description, children }: CardProps) {
  return (
    <div className="mb-4 p-4 rounded-xl border bg-background/30 @container relative">
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      {children}
    </div>
  )
}

export default Card
