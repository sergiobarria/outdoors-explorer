import { Card, Image, Text } from '@mantine/core'

export const CampgroundCard = () => {
  return (
    <Card
      shadow="sm"
      p="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          height={160}
          alt="No way!"
        />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
        You&apos;ve won a million dollars in cash!
      </Text>

      <Text mt="xs" color="dimmed" size="sm">
        Please click anywhere on this card to claim your reward, this is not a fraud,
        trust us
      </Text>
    </Card>
  )
}

// // import { IconBookmark, IconHeart, IconShare } from '@tabler/icons';
// import {
//   Card,
//   Image,
//   Text,
//   ActionIcon,
//   Badge,
//   Group,
//   Center,
//   Avatar,
//   createStyles,
//   Button
// } from '@mantine/core'
// import { useNavigate } from 'react-router-dom'

// const useStyles = createStyles((theme) => ({
//   card: {
//     position: 'relative',
//     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
//   },

//   rating: {
//     position: 'absolute',
//     top: theme.spacing.xs,
//     right: theme.spacing.xs + 2,
//     pointerEvents: 'none'
//   },

//   title: {
//     display: 'block',
//     marginTop: theme.spacing.md,
//     marginBottom: theme.spacing.xs / 2
//   },

//   action: {
//     backgroundColor:
//       theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//     ...theme.fn.hover({
//       backgroundColor:
//         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
//     })
//   },

//   footer: {
//     marginTop: theme.spacing.md
//   }
// }))

// interface ArticleCardProps {
//   image: string
//   link: string
//   title: string
//   description: string
// }

// export function CampgroundCard({
//   className,
//   image,
//   link,
//   title,
//   description,
//   ...others
// }: ArticleCardProps &
//   Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) {
//   const { classes, cx, theme } = useStyles()
//   const navigate = useNavigate()
//   const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' }

//   return (
//     <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
//       <Card.Section>
//         <a {...linkProps}>
//           <Image src={image} height={180} />
//         </a>
//       </Card.Section>

//       <Text className={classes.title} weight={500} component="a" {...linkProps}>
//         {title}
//       </Text>

//       <Text size="sm" color="dimmed" lineClamp={4}>
//         {description}
//       </Text>

//       <Group position="apart" className={classes.footer}>
//         <Button onClick={() => navigate(link)}>See Details</Button>
//       </Group>
//     </Card>
//   )
// }
