// components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Share2 } from 'lucide-react'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  status: 'In Progress' | 'Completed' | 'Draft'
  lastUpdated: string
  onEdit: () => void
  onView: () => void
  onShare: () => void
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ title, status, lastUpdated, onEdit, onView, onShare, className, ...props }, ref) => {
    const [isHighlighted, setIsHighlighted] = React.useState(false)

    return (
      <Card 
        ref={ref}
        className={cn(`transition-shadow duration-300 ${isHighlighted ? 'shadow-lg' : ''}`, className)}
        onClick={() => setIsHighlighted(!isHighlighted)}
        {...props}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <CardTitle className="text-xl font-bold text-center mb-2">{title}</CardTitle>
          <Badge className="mb-2">{status}</Badge>
          <CardDescription className="text-sm text-gray-500 mb-4">Last updated: {lastUpdated}</CardDescription>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onView(); }}>
              <Eye className="mr-2 h-4 w-4" /> View
            </Button>
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onShare(); }}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
)
ProjectCard.displayName = "ProjectCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, ProjectCard }