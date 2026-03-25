interface FooterProps {
    authorName: string;
}

export default function Footer({ authorName }: FooterProps) {
    return (
        <footer className="fixed bottom-0 left-0 z-30 w-full py-4 bg-gray-200 text-center shadow-lg">
            <p className="text-sm text-gray-600">Được thiết kế bởi: {authorName}</p>
        </footer>
    );
}