'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { Menu, X, Leaf, Heart, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Link from 'next/link'
import Image from 'next/image'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext)

export function LandingPageComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [openModal, setOpenModal] = useState<number | null>(null)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const products = [
    { 
      name: 'Granola Clásica', 
      price: 9.99, 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202024-10-13%20a%20las%2014.08.08_ec10002d-lcfpjkRXpVhRRwjxbzaaFK6fW2HPFd.jpg',
      ingredients: 'Avena, almendras, nueces, miel, aceite de coco, canela, vainilla'
    },
    { 
      name: 'Granola en Tarro', 
      price: 10.99, 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202024-10-13%20a%20las%2014.25.05_dbea8ec7-8pk8SXXWe8J2abxZX7nehepHIZ2sZq.jpg',
      ingredients: 'Avena, almendras, nueces, miel, aceite de coco, canela, vainilla, pasas'
    },
    { 
      name: 'Granola en Pote', 
      price: 11.99, 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202024-10-13%20a%20las%2014.25.06_3a3cd473-9dFuXdMkEpyTOEgkuHwT9FCkZJsRai.jpg',
      ingredients: 'Avena, almendras, nueces, miel, aceite de coco, canela, vainilla, semillas de chía'
    },
    { 
      name: 'Granola en Bolsa', 
      price: 12.99, 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202024-10-13%20a%20las%2014.25.06_bb2ee6a4-ycNjytlMMoIeqQQLJuZnZQTPPCDtxe.jpg',
      ingredients: 'Avena, almendras, nueces, miel, aceite de coco, canela, vainilla, coco rallado'
    },
  ]

  return (
    <ThemeProvider>
      <div className="bg-[#FFF8E1] dark:bg-[#4A3728] transition-colors duration-300">
        {/* Navigation */}
        <header className="fixed inset-x-0 top-0 z-50 bg-[#FFF8E1] dark:bg-[#4A3728] shadow dark:shadow-[#2C1E16]">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Bocados Nuts</span>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-bocados-ppKacTk0AfITLRn7gdCHRHEYKt0kYy.jpg"
                  alt="Bocados Nuts Logo"
                  width={80}
                  height={80}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#4A3728] dark:text-[#FFF8E1]"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Abrir menú principal</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12 lg:justify-center lg:flex-1">
              <button onClick={() => scrollToSection('productos')} className="text-sm font-semibold leading-6 text-[#4A3728] dark:text-[#FFF8E1]">Productos</button>
              <button onClick={() => scrollToSection('sobre-nosotros')} className="text-sm font-semibold leading-6 text-[#4A3728] dark:text-[#FFF8E1]">Sobre Nosotros</button>
              <button onClick={() => scrollToSection('contacto')} className="text-sm font-semibold leading-6 text-[#4A3728] dark:text-[#FFF8E1]">Contacto</button>
            </div>
          </nav>
          {/* Mobile menu, show/hide based on menu open state. */}
          <div className={`lg:hidden ${mobileMenuOpen ? "" : "hidden"}`} role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#FFF8E1] dark:bg-[#4A3728] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-[#4A3728]/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Bocados Nuts</span>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-bocados-ppKacTk0AfITLRn7gdCHRHEYKt0kYy.jpg"
                    alt="Bocados Nuts Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-[#4A3728] dark:text-[#FFF8E1]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-[#4A3728]/10">
                  <div className="space-y-2 py-6">
                    <button onClick={() => scrollToSection('productos')} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#4A3728] dark:text-[#FFF8E1] hover:bg-[#E8D5B5] w-full text-left">Productos</button>
                    <button onClick={() => scrollToSection('sobre-nosotros')} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#4A3728] dark:text-[#FFF8E1] hover:bg-[#E8D5B5] w-full text-left">Sobre Nosotros</button>
                    <button onClick={() => scrollToSection('contacto')} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#4A3728] dark:text-[#FFF8E1] hover:bg-[#E8D5B5] w-full text-left">Contacto</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Hero section */}
          <div className="relative isolate pt-14">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-[#4A3728] dark:text-[#FFF8E1] sm:text-6xl">
                  Una explosión a tus sentidos
                </h1>
                <p className="mt-6 text-lg leading-8 text-[#6B5141] dark:text-[#E8D5B5]">
                  Descubre el sabor natural de Bocados Nuts. Granola artesanal hecha con ingredientes premium para un estilo de vida saludable y delicioso.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button onClick={() => scrollToSection('productos')} className="bg-[#4A3728] text-[#FFF8E1] hover:bg-[#6B5141]">
                    Descubre nuestros productos
                  </Button>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/producto-granola-OeGF5gkwmJxlSQI5V0N92OP9PjwAp4.jpg"
                  alt="Bocados Nuts Granola"
                  width={440}
                  height={440}
                  className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Feature section */}
          <div id="sobre-nosotros" className="bg-[#FFF8E1] dark:bg-[#4A3728] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-[#2C8D3F] dark:text-[#7CC989]">Por qué elegir Bocados Nuts</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-[#4A3728] dark:text-[#FFF8E1] sm:text-4xl">
                  Nutrición y sabor en cada bocado
                </p>
                <p className="mt-6 text-lg leading-8 text-[#6B5141] dark:text-[#E8D5B5]">
                  Nuestras granolas están hechas con ingredientes cuidadosamente seleccionados para ofrecerte lo mejor en sabor y salud.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                  <div className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-[#4A3728] dark:text-[#FFF8E1]">
                      <Leaf className="h-5 w-5 flex-none text-[#2C8D3F] dark:text-[#7CC989]" aria-hidden="true" />
                      100% Natural
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-[#6B5141] dark:text-[#E8D5B5]">
                      <p className="flex-auto">Ingredientes naturales  sin aditivos artificiales ni conservantes.</p>
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-[#4A3728] dark:text-[#FFF8E1]">
                      <Heart className="h-5 w-5 flex-none text-[#2C8D3F] dark:text-[#7CC989]" aria-hidden="true" />
                      Saludable
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-[#6B5141] dark:text-[#E8D5B5]">
                      <p className="flex-auto">Rica en fibra, proteínas y grasas saludables para tu bienestar.</p>
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-[#4A3728] dark:text-[#FFF8E1]">
                      <Award className="h-5 w-5 flex-none text-[#2C8D3F] dark:text-[#7CC989]" aria-hidden="true" />
                      Calidad Premium
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-[#6B5141] dark:text-[#E8D5B5]">
                      <p className="flex-auto">Elaborada con los mejores frutos secos y cereales de alta calidad.</p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Product section */}
          <div id="productos" className="bg-[#FFF8E1] dark:bg-[#4A3728]">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight text-[#4A3728] dark:text-[#FFF8E1]">Nuestros Productos</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product, index) => (
                  <div key={index} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-[#E8D5B5] lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <Image
                        src={product.imageSrc}
                        alt={product.name}
                        width={280}
                        height={280}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-[#4A3728] dark:text-[#FFF8E1]">
                          <a href="#">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {product.name}
                          </a>
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-[#4A3728] dark:text-[#FFF8E1]">${product.price}</p>
                    </div>
                    <Button 
                      className="mt-4 w-full bg-[#4A3728] text-[#FFF8E1] hover:bg-[#6B5141]"
                      onClick={() => setOpenModal(index)}
                    >
                      Ver detalles
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Modal */}
          <Dialog open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{openModal !== null ? products[openModal].name : ''}</DialogTitle>
                <DialogDescription>
                  <Image
                    src={openModal !== null ? products[openModal].imageSrc : ''}
                    alt={openModal !== null ? products[openModal].name : ''}
                    width={200}
                    height={200}
                    className="mx-auto my-4 rounded-md"
                  />
                  <h4 className="font-semibold mb-2">Ingredientes:</h4>
                  <p>{openModal !== null ? products[openModal].ingredients : ''}</p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Testimonial section */}
          <div className="bg-[#FFF8E1] dark:bg-[#4A3728] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-lg font-semibold leading-8 tracking-tight text-[#2C8D3F] dark:text-[#7CC989]">Testimonios</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-[#4A3728] dark:text-[#FFF8E1] sm:text-4xl">
                  Lo que dicen nuestros clientes
                </p>
              </div>
              <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
                  {[
                    { name: 'María G.', comment: 'La mejor granola que he probado. Deliciosa y saludable.' },
                    { name: 'Juan P.', comment: 'Excelente calidad y sabor. Ahora es parte de mi desayuno diario.' },
                    { name: 'Ana L.', comment: 'Me encanta la variedad de sabores. Toda la familia la disfruta.' },
                  ].map((testimonial, index) => (
                    <div key={index} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                      <figure className="rounded-2xl bg-[#E8D5B5] dark:bg-[#6B5141] p-8 text-sm leading-6">
                        <blockquote className="text-[#4A3728] dark:text-[#FFF8E1]">
                          <p>{`"${testimonial.comment}"`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <div className="font-semibold text-[#4A3728] dark:text-[#FFF8E1]">{testimonial.name}</div>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer id="contacto" className="bg-[#FFF8E1] dark:bg-[#4A3728]">
          <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <Link href="#" className="text-[#4A3728] dark:text-[#FFF8E1] hover:text-[#6B5141] dark:hover:text-[#E8D5B5]">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-[#4A3728] dark:text-[#FFF8E1] hover:text-[#6B5141] dark:hover:text-[#E8D5B5]">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-[#4A3728] dark:text-[#FFF8E1] hover:text-[#6B5141] dark:hover:text-[#E8D5B5]">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-center text-xs leading-5 text-[#4A3728] dark:text-[#FFF8E1]">
                &copy; 2023 Bocados Nuts. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}