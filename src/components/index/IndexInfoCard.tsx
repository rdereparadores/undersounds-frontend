import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

interface IndexInfoCardProps {
    title: string,
    description: string,
    children?: React.ReactNode
}

export const IndexInfoCard = ({ title, description, children }: IndexInfoCardProps) => (
    <Card className={`w-5/6 max-w-4xl p-5 h-[500px] sticky top-[10dvh] bg-gray-100`}>
        <CardHeader>
            <CardTitle className='text-center font-bold text-3xl'>
                {title}
            </CardTitle>
            <CardDescription className='text-center mt-3'>
                {description}
            </CardDescription>
        </CardHeader>

        <CardContent className='mt-10 flex justify-evenly items-center'>
            {children}
        </CardContent>
    </Card>
)