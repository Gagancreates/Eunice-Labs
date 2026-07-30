import { lessons } from '../../data/lessons';
import { Lesson } from '../../components/Lesson';

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return { title: 'Lesson Not Found' };
  }

  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: `/learn/lesson/${lesson.id}` },
    openGraph: {
      title: `${lesson.title} | Eunice Labs`,
      description: lesson.description,
      url: `/learn/lesson/${lesson.id}`,
      images: ['/opengraph-image.png'],
    },
  };
}

export default function LessonPage() {
  return <Lesson />;
}
