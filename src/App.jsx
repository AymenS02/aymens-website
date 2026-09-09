import React from 'react'
import HeroTitle from './components/HeroTitle'
import HeroSubtitle from './components/HeroSubtitle'
import HeroCard from './components/HeroCard'

const App = () => {
  return (
    <div className="">

      {/* Hero */}
      <div className="min-h-screen w-screen bg-gradient-to-b from-primary to-secondary">
        <div className="flex flex-col items-start justify-start p-20 gap-20">
          <HeroTitle />
          {/* <HeroSubtitle /> */}
        </div>
        <div className="absolute left-[75%] top-[50%]">
          <HeroCard />
        </div>
      </div>




<div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
  {/* Primary */}
  <div className="rounded-3xl bg-primary p-6 text-foreground shadow-md">
    <div className="mb-16">
      <p className="text-xs font-bold uppercase tracking-widest">
        Primary
      </p>

      <p className="mt-1 font-mono text-sm">
        #FA8334
      </p>
    </div>

    <p className="font-bold">
      Buttons, links and important elements
    </p>
  </div>

  {/* Secondary */}
  <div className="rounded-3xl bg-secondary p-6 text-foreground shadow-md">
    <div className="mb-16">
      <p className="text-xs font-bold uppercase tracking-widest">
        Secondary
      </p>

      <p className="mt-1 font-mono text-sm">
        #FFFD77
      </p>
    </div>

    <p className="font-bold">
      Highlights, badges and decorations
    </p>
  </div>

  {/* Accent */}
  <div className="rounded-3xl border border-foreground/10 bg-accent p-6 text-foreground shadow-md">
    <div className="mb-16">
      <p className="text-xs font-bold uppercase tracking-widest">
        Accent
      </p>

      <p className="mt-1 font-mono text-sm">
        #F0F8EA
      </p>
    </div>

    <p className="font-bold">
      Cards, navigation and content panels
    </p>
  </div>

  {/* Background */}
  <div className="rounded-3xl border border-foreground/10 bg-background p-6 text-foreground shadow-md">
    <div className="mb-16">
      <p className="text-xs font-bold uppercase tracking-widest">
        Background
      </p>

      <p className="mt-1 font-mono text-sm">
        #E7E8D1
      </p>
    </div>

    <p className="font-bold">
      Main page and large section backgrounds
    </p>
  </div>

  {/* Foreground */}
  <div className="rounded-3xl bg-foreground p-6 text-accent shadow-md">
    <div className="mb-16">
      <p className="text-xs font-bold uppercase tracking-widest">
        Foreground
      </p>

      <p className="mt-1 font-mono text-sm">
        #25251F
      </p>
    </div>

    <p className="font-bold">
      Headings and primary text
    </p>
  </div>

  {/* Muted */}
  <div className="rounded-3xl bg-muted p-6 text-accent shadow-md">
    <div className="mb-16">
      <p className="text-xs font-bold uppercase tracking-widest">
        Muted
      </p>

      <p className="mt-1 font-mono text-sm">
        #65665B
      </p>
    </div>

    <p className="font-bold">
      Descriptions, captions and metadata
    </p>
  </div>
</div>

    </div>
  )
}

export default App