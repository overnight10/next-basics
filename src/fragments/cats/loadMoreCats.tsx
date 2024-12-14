import { Button, ButtonProps } from "@/components/ui/button";

export default function LoadMoreCats({ onClick, ...props }: ButtonProps) {
    return (
        <Button onClick={onClick} className="w-full" {...props}>
            Load more cats 🐈
        </Button>
    )
}