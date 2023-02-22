/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Text, Container, ThemeUIStyleObject } from 'theme-ui'
import Logo from 'components/logo'
import { Link } from 'components/link'
import FooterWidget from 'components/Footer/widget'
import { menuItems, footerNav } from './footer.data'
import { rgba } from 'polished'

interface Props {
  sx: ThemeUIStyleObject
}

export default function Footer({ sx }: Props) {
  return (
    <footer sx={styles.footer}>
      <Container>
        {/* <Box sx={styles.footerTopInner}>
          {menuItems.map(({ id, title, items }) => (
            <FooterWidget key={id} title={title} items={items} />
          ))}
        </Box> */}
      </Container>
      <Container>
        <Box sx={styles.footerInner}>
          <Box sx={styles.copyright}>
            <Logo
              sx={styles.logo}
              light
              isSticky={undefined}
              dark={undefined}
            />
            <Text as="span">
              Copyright by {new Date().getFullYear()} RedQ, Inc
            </Text>
          </Box>

          <Box as="ul" sx={styles.footerNav}>
            {footerNav.map(({ path, label }, i) => (
              <li key={i}>
                <Link
                  path={path}
                  key={i}
                  label={label}
                  variant="footer"
                  children={undefined}
                />
              </li>
            ))}
          </Box>
        </Box>
      </Container>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#1D2146',
    pt: 9,
  },
  footerTopInner: {
    gap: [50, null, null, null, 0, 50],
    display: ['grid'],
    gridTemplateColumns: [
      'repeat(2, 1fr)',
      null,
      null,
      'repeat(3, 1fr)',
      'repeat(5, 1fr)',
    ],
    mb: [null, null, null, 7],
  },
  footerInner: {
    borderTop: [null, null, null, `1px solid ${rgba('white', 0.15)}`],
    display: ['block', null, 'flex'],
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ['30px 0 20px', null, null, '30px 0 35px', '35px 0 40px'],
  },
  copyright: {
    display: ['flex'],
    alignItems: 'center',
    flexDirection: ['column', null, null, null, 'row'],
    span: {
      fontSize: '14px',
      lineHeight: 1.29,
      color: 'white',
      mt: ['18px', '18px', '7px'],
    },
  },
  logo: {
    mr: 3,
  },
  footerNav: {
    listStyle: 'none',
    margin: ['15px 0 0', '15px 0 0', '0'],
    padding: 0,
    display: ['flex'],
    flexWrap: ['wrap', null, null, 'unset'],
    justifyContent: ['center', null, 'flex-start'],
    'li + li': {
      ml: ['18px', null, '20px'],
      '@media only screen and (max-width: 400px)': {
        mb: '10px',
      },
    },
    a: {
      color: 'white',
      fontSize: [1, null, null, 2],
      textDecoration: 'none',
    },
  },
}
