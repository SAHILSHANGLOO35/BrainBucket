import {
  ArrowUpRight,
  Instagram,
  LayoutDashboardIcon,
  Linkedin,
  LucideLink2,
  Mail,
  User2,
} from "lucide-react";
import XIcon from "@mui/icons-material/X";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "motion/react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import InsightsIcon from "@mui/icons-material/Insights";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function LandingPage() {
  const navigate = useNavigate();

  function login() {
    navigate(`/signin`);
  }

  function signup() {
    navigate(`/signup`);
  }

  function getStarted() {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
      },
    },
  };

  const reverseMarqueeVariants: Variants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  const imageScrollRef = useRef(null);

  const commonTileClasses = `rounded-lg flex items-center justify-center h-20 min-w-max text-neutral-500`;

  return (
    <div className="min-h-screen max-w-screen flex flex-col relative px-24 py-4 font-manrope gap-20">
      <div className="min-h-screen absolute inset-0 -z-10">
        <div className="absolute h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      </div>

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 1.3,
          bounce: 0.1,
          mass: 0.8,
          stiffness: 100,
          damping: 20,
          opacity: { duration: 1.0, ease: "easeInOut" },
        }}
        viewport={{ once: true }}
        className="mx-auto w-full flex items-center justify-between px-4 rounded-full py-1"
        style={{
          boxShadow:
            "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
        }}
      >
        <div className="text-black font-extrabold text-2xl flex items-center gap-2">
          <AutoFixHighIcon />
          brainbucket
        </div>
        <div className="flex items-center gap-x-8">
          <div className="font-bold text-[15px] cursor-pointer" onClick={login}>
            Log in
          </div>
          <div
            className="flex items-center justify-center gap-2 font-medium text-[15px] bg-neutral-800 text-neutral-100 border-neutral-800 rounded-full px-3 py-1 shadow-md shadow-black/10 group cursor-pointer"
            onClick={signup}
          >
            <div className="group-hover:scale-150 transition-all duration-200">
              <User2 size={15} />
            </div>
            <div className="">Sign up</div>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-screen flex flex-col items-center justify-center pt-2 mb-5 mt-5">
        <div className="text-3xl max-w-5xl sm:text-4xl md:text-7xl font-bold text-center flex flex-col items-center justify-center text-neutral-950">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.3,
              bounce: 0.1,
              mass: 0.8,
              stiffness: 100,
              damping: 20,
              opacity: { duration: 1.0, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
          >
            Your Digital Brain for Important{" "}
            <span className="text-transparent font-pacifico px-1 bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]">
              Content
            </span>
          </motion.div>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.3,
              bounce: 0.1,
              mass: 0.8,
              stiffness: 100,
              damping: 20,
              opacity: { duration: 1.0, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
            className="text-lg sm:text-lg max-w-md text-neutral-400 mb-8 px-4 sm:px-0 pt-4 font-medium"
          >
            Save, organize, and share your valuable online content in one secure
            place!
          </motion.p>
          <motion.button
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              // duration: 1.3,
              bounce: 0.1,
              mass: 0.8,
              stiffness: 100,
              damping: 20,
              // opacity: { duration: 1.0, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
            className="flex items-center w-fit px-4 py-2 rounded-full relative bg-black text-white text-sm hover:shadow-2xl hover:shadow-white transition duration-200 border border-neutral-600 mb-8 cursor-pointer group"
            onClick={getStarted}
          >
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <motion.span
              className="flex-1 text-center relative z-20 px-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                bounce: 0.1,
                mass: 0.8,
                stiffness: 100,
                damping: 20,
              }}
              viewport={{ once: true }}
            >
              Get Started
            </motion.span>
            <ArrowUpRight className="relative z-20 group-hover:rotate-45 transition-all duration-200 flex items-center justify-center" />
          </motion.button>

          <div className="pt-4 mb-8 w-full">
            <motion.img
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                duration: 1.3,
                bounce: 0.1,
                mass: 0.8,
                stiffness: 100,
                damping: 20,
                // opacity: { duration: 2.0, ease: "easeInOut" },
              }}
              viewport={{ once: true }}
              src="/assets/Pulsecheck.png"
              alt="Brain Bucket Dashboard Image"
              className="rounded-md md:rounded-lg shadow-[0_-10px_20px_rgba(240,_46,_170,_0.25)]"
            />
          </div>
          <div className="pt-4 mb-8 flex flex-col">
            <div className="text-xl font-semibold text-neutral-600">
              Works Seamlessly With The{" "}
              <span className="font-pacifico font-thin">Followings</span>
            </div>
            <div
              className="relative mt-8 w-full max-w-5xl overflow-hidden px-4"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
              }}
            >
              <motion.div
                className="flex items-center whitespace-nowrap"
                variants={reverseMarqueeVariants}
                animate="animate"
              >
                {[...Array(4)].map((_, index) => (
                  <div
                    key={`row2-${index}`}
                    className="flex gap-6 sm:gap-12 px-6"
                  >
                    {/* X.com */}
                    <div
                      className={`${commonTileClasses} transition-transform duration-300 hover:scale-110`}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img
                        src="/assets/twitter.png"
                        alt="X"
                        className="h-10 w-10 sm:h-12 sm:w-12"
                      />
                      <span className="text-xl sm:text-2xl font-semibold ml-2 text-neutral-800">
                        X.com
                      </span>
                    </div>

                    {/* YouTube */}
                    <div
                      className={`${commonTileClasses} transition-transform duration-300 hover:scale-110`}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img
                        src="/assets/youtube.png"
                        alt="YouTube"
                        className="h-10 w-10 sm:h-12 sm:w-12"
                      />
                      <span className="text-xl sm:text-2xl font-semibold ml-2 text-neutral-800">
                        YouTube.com
                      </span>
                    </div>

                    {/* PDFs */}
                    <div
                      className={`${commonTileClasses} transition-transform duration-300 hover:scale-110`}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img
                        src="/assets/pdf.png"
                        alt="PDFs"
                        className="h-10 w-10 sm:h-12 sm:w-12"
                      />
                      <span className="text-xl sm:text-2xl font-semibold ml-2 text-neutral-800">
                        PDFs
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-screen flex flex-col items-center justify-center pt-2 mb-5 mt-5 overflow-hidden">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 0.2,
            duration: 1.3,
            bounce: 0.1,
            mass: 0.8,
            stiffness: 100,
            damping: 20,
            opacity: { duration: 1.0, ease: "easeInOut" },
          }}
          viewport={{ once: true }}
          className="text-3xl max-w-5xl sm:text-4xl md:text-7xl font-bold text-center flex flex-col items-center justify-center text-neutral-950"
        >
          What You Can Do with{" "}
          <span className="text-transparent font-pacifico px-1 py-1 bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]">
            Brain Bucket
          </span>
          <p className="text-lg sm:text-lg max-w-md text-neutral-400 mb-8 px-4 sm:px-0 pt-4 font-medium">
            Keep all your important content here whether it's YouTube Video,
            Tweet, or PDF.
          </p>
          <div className="flex items-center justify-center gap-6">
            {/* Left Card: Animate from left */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true, amount: 0.5 }}
              className="h-[360px] w-96 rounded-xl bg-neutral-100 border border-neutral-300/40 flex flex-col gap-2 overflow-hidden pt-4 items-start px-4"
              style={{
                boxShadow:
                  "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
              }}
            >
              <div className="text-xl text-neutral-900 font-extrabold">
                Save Your YouTube Videos
              </div>
              <div className="text-xs text-neutral-500/90 font-semibold text-start">
                Easily add your YouTube video links and save them here in one
                place. This way, you'll always have quick access to your
                favorite videos and never lose track of them in the future.
              </div>
              <div className="flex flex-col gap-4 overflow-hidden">
                <img
                  src="assets/ytIframe.jpeg"
                  alt=""
                  className="rounded-lg shadow-[0_10px_20px_rgba(240,_46,_170,_0.3)]"
                />
                <img
                  src="assets/ytIframe.jpeg"
                  alt=""
                  className="rounded-lg shadow-[0_-10px_20px_rgba(240,_46,_170,_0.1)] mask-b-from-0"
                />
              </div>
            </motion.div>

            {/* Center Card: Animate from below */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true, amount: 0.5 }}
              className="h-96 w-96 rounded-xl bg-neutral-100 border border-neutral-300/40 flex flex-col gap-2 overflow-hidden pt-4 items-start px-4"
              style={{
                boxShadow:
                  "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
              }}
            >
              <div className="text-xl text-neutral-900 font-extrabold">
                Save Your Important Tweets
              </div>
              <div className="text-xs text-neutral-500/90 font-semibold text-start">
                Easily add your important tweets by just adding Tweet URL and
                save them here in one place. This way, you'll always have quick
                access to valuable insights, updates, or ideas and never lose
                track of them in the future.
              </div>
              <div className="flex flex-col gap-4 overflow-hidden">
                <img
                  src="assets/tweet.png"
                  alt=""
                  className="rounded-lg shadow-[0_10px_20px_rgba(240,_46,_170,_0.3)] mask-b-from-40"
                />
              </div>
            </motion.div>

            {/* Right Card: Animate from right */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true, amount: 0.5 }}
              className="h-[360px] w-96 rounded-xl bg-neutral-100 border border-neutral-300/40 flex flex-col gap-2 overflow-hidden pt-4 items-start px-4"
              style={{
                boxShadow:
                  "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
              }}
            >
              <div className="text-xl text-neutral-900 font-extrabold">
                Save Your PDFs too
              </div>
              <div className="text-xs text-neutral-500/90 font-semibold text-start">
                Easily upload and save your important PDFs here in one place.
                This way, you'll always have quick access to your documents and
                never lose track of them in the future.
              </div>
              <div className="flex flex-col gap-4 overflow-hidden">
                <img
                  src="assets/pdf_bb.png"
                  alt=""
                  className="rounded-lg shadow-[0_10px_20px_rgba(240,_46,_170,_0.3)] mask-b-from-50"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-screen flex flex-col items-center justify-center pt-2 mb-5 mt-5 overflow-hidden relative">
        <div className="mx-auto flex w-full flex-col items-center justify-center">
          {/* Heading */}
          <div className="flex text-center">
            <motion.h2
              className="text-3xl max-w-5xl sm:text-4xl md:text-7xl font-bold text-center flex items-center justify-center text-neutral-950"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                duration: 1.3,
                bounce: 0.1,
                mass: 0.8,
                stiffness: 100,
                damping: 20,
                opacity: { duration: 1.0, ease: "easeInOut" },
              }}
              viewport={{ once: true }}
            >
              How to get{" "}
              <span className="text-transparent font-pacifico px-4 py-1 bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]">
                Started
              </span>
            </motion.h2>
          </div>

          {/* Content & Image */}
          <div
            className="sm:md-10 flex w-full h-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-14"
            ref={imageScrollRef}
          >
            {/* Left Text & Timeline */}
            <div className="flex w-full max-w-3xl flex-col px-0 sm:px-4 pt-2">
              <motion.div
                className="relative text-lg max-w-2xl text-neutral-600 mb-4 px-4 sm:px-0 pt-4 font-semibold sm:text-3xl md:text-4xl"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  duration: 1.2,
                  bounce: 0.1,
                  mass: 0.8,
                  stiffness: 80,
                  damping: 20,
                  opacity: { duration: 1.0, ease: "easeOut" },
                }}
                viewport={{ root: imageScrollRef, amount: 0.3, once: true }}
              >
                Collect, Save, Access - All Your Important PDFs, Videos, and
                Tweets in One Hub.
              </motion.div>

              <div className="text-lg sm:text-lg max-w-md text-neutral-400 px-4 sm:px-0 font-medium">
                Your dashboard keeps all your PDFs, videos, and tweets
                organized. Track, manage, and access them quickly, with zero
                clutter.
              </div>

              <div className="mt-6 text-neutral-900/80">
                <Timeline position="alternate">
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      align="right"
                      variant="body2"
                      color="oklch(26.9% 0 0)"
                    >
                      Step 1
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary" variant="outlined">
                        <PersonIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Create Your Account
                      </Typography>
                      <Typography>
                        Sign up in seconds and explore our features.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="oklch(26.9% 0 0)"
                    >
                      Step 2
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary">
                        <LucideLink2 />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Add Your Content
                      </Typography>
                      <Typography>
                        Easily save PDFs, YouTube videos, and tweets to your
                        BrainBucket with just a link or upload.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      align="right"
                      variant="body2"
                      color="oklch(26.9% 0 0)"
                    >
                      Step 3
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary" variant="outlined">
                        <LayoutDashboardIcon />
                      </TimelineDot>
                      <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Stay Organized
                      </Typography>
                      <Typography>
                        Your saved content is neatly arranged in one dashboard -
                        simple, searchable, and clutter-free.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="oklch(26.9% 0 0)"
                    >
                      Step 4
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                      <TimelineDot color="secondary">
                        <InsightsIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Access Anytime
                      </Typography>
                      <Typography>
                        Quickly find and revisit your important files, videos,
                        and tweets whenever you need them.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>

            {/* Right Image */}
            <motion.div
              className="h-[250px] w-full sm:h-[400px] md:h-screen lg:h-screen flex items-center justify-start overflow-hidden pt-2"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                duration: 1.2,
                bounce: 0.1,
                mass: 0.8,
                stiffness: 80,
                damping: 20,
                opacity: { duration: 1.0, ease: "easeOut" },
              }}
              viewport={{ root: imageScrollRef, amount: 0.2, once: true }}
            >
              <div className="h-full w-[900px] max-w-none">
                <img
                  src="assets/Pulsecheck.png"
                  alt=""
                  className="h-full w-full object-cover object-left rounded-l-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-screen flex flex-col items-center justify-center pt-2 mb-5 mt-5 overflow-hidden relative">
        <div className="mx-auto flex w-full flex-col items-center justify-center px-2 sm:px-4">
          {/* Heading Section */}
          <motion.div
            className="flex flex-col items-center justify-center px-2 pb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.3,
              bounce: 0.1,
              mass: 0.8,
              stiffness: 100,
              damping: 20,
              opacity: { duration: 1.0, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl max-w-5xl sm:text-4xl md:text-7xl font-bold text-center flex items-center justify-center text-neutral-950">
              Got any Questions in Mind ?
            </h2>

            <div className="mt-4 flex flex-col items-baseline justify-center gap-0 bg-gradient-to-r from-neutral-100 to-neutral-500 bg-clip-text pb-4 text-3xl font-medium tracking-tight text-transparent sm:flex-row sm:gap-4 sm:text-4xl md:mt-0 md:text-5xl">
              <span className="text-3xl max-w-5xl sm:text-4xl md:text-5xl font-bold text-center flex items-center justify-center text-neutral-950">
                We've got
              </span>
              <span className="text-transparent font-pacifico pr-2 py-1 bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]">
                answers
              </span>
            </div>

            <div className="text-lg sm:text-lg max-w-xl text-center text-neutral-400 mb-8 px-4 sm:px-0 pt-4 font-medium">
              Get clear answers to how our platform makes it easy to understand
              and improve your Website's performance.
            </div>
          </motion.div>

          {/* Accordion Section */}
          <motion.div
            className="w-full md:max-w-3xl lg:max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Accordion type="single" collapsible>
              <motion.div variants={itemVariants}>
                <AccordionItem value="item-1" className="">
                  <AccordionTrigger className="text-neutral-900">
                    What is BrainBucket?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    BrainBucket is your personal hub to collect, save, and
                    organize all your important PDFs, YouTube videos, and tweets
                    in one place. It helps you keep everything neat, accessible,
                    and clutter-free.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div variants={itemVariants}>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-wrap text-neutral-900">
                    How does BrainBucket help me stay organized?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    Instead of juggling multiple folders, bookmarks, and apps,
                    BrainBucket stores all your content in a single dashboard.
                    You can quickly search, filter, and access anything without
                    losing track.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div variants={itemVariants}>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-neutral-900">
                    What type of content can I save in BrainBucket?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can save PDFs, YouTube videos, and tweets. Simply paste
                    a link or upload a file, and BrainBucket takes care of
                    storing and organizing it for you.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div variants={itemVariants}>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-neutral-900">
                    Can I access my saved content anytime?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, your BrainBucket is available 24/7. You can log in from
                    anywhere and instantly access your organized dashboard of
                    saved PDFs, videos, and tweets whenever you need them.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="max-w-screen flex flex-col items-center justify-center pt-2 mb-5 mt-5 overflow-hidden relative">
        <div className="mx-auto flex w-full flex-col items-center justify-center px-2 sm:px-4">
          {/* Heading Section */}
          <motion.div
            className="flex flex-col items-center justify-center px-2 pb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.3,
              bounce: 0.1,
              mass: 0.8,
              stiffness: 100,
              damping: 20,
              opacity: { duration: 1.0, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl max-w-5xl sm:text-4xl md:text-7xl font-bold text-center flex items-center justify-center text-neutral-950">
              Organize Your Brain with
            </h2>

            <div className="flex flex-col items-baseline justify-center gap-0 bg-gradient-to-r from-neutral-100 to-neutral-500 bg-clip-text pb-4 text-3xl font-medium tracking-tight text-transparent sm:flex-row sm:gap-4 sm:text-4xl md:mt-0 md:text-5xl">
              <span className="text-3xl max-w-5xl sm:text-4xl md:text-7xl font-bold text-center flex items-center justify-center text-transparent font-pacifico pr-2 py-1 bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]">
                Brain Bucket
              </span>
            </div>

            <div className="text-lg sm:text-lg max-w-xl text-center text-neutral-400 mb-8 px-4 sm:px-0 font-medium">
              No more lost links or scattered files. With BrainBucket, your
              ideas, resources, and inspirations live in one simple, organized
              space.
            </div>
          </motion.div>

          {/* Branding Section */}
          <motion.div
            className="w-full md:max-w-3xl lg:max-w-4xl"
            variants={containerVariants}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.3,
              bounce: 0.1,
              mass: 0.8,
              stiffness: 100,
              damping: 20,
              opacity: { duration: 1.0, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="text-black font-extrabold text-2xl flex items-center gap-2">
                  <AutoFixHighIcon />
                  brainbucket
                </div>
                <div className="flex gap-4 items-center">
                  <span className="font-semibold">Social Media</span>
                  <span className="px-2 py-2 border border-neutral-700/30 rounded-md cursor-pointer">
                    <XIcon />
                  </span>
                  <span className="px-2 py-2 border border-neutral-700/30 rounded-md cursor-pointer">
                    <Instagram />
                  </span>
                  <span className="px-2 py-2 border border-neutral-700/30 rounded-md cursor-pointer">
                    <Linkedin />
                  </span>
                </div>
              </div>
              <div className="border-b w-full border-neutral-700/40" />
              <div className="flex items-start justify-between">
                <div className="flex gap-2 items-center">
                  <span className="font-semibold">Reach Developer at</span>
                  <span className="px-2 py-2 border border-neutral-700/30 rounded-md cursor-pointer">
                    <Mail />
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Product</span>
                    <span className="text-neutral-500 font-medium">
                      Features
                    </span>
                    <span className="text-neutral-500 font-medium">
                      Integration
                    </span>
                    <span className="text-neutral-500 font-medium">
                      Support
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Developer</span>
                    <span className="text-neutral-500 font-medium">About</span>
                    <span className="text-neutral-500 font-medium">
                      Contact
                    </span>
                    <span className="text-neutral-500 font-medium">
                      Partners
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-b w-full border-neutral-700/40" />
              <div className="flex items-center justify-between font-semibold text-neutral-500">
                <span>© 2025 Brain Bucket. All rights reserved</span>
                <span>~ Sahl Shangloo AKA doubleSdotdev</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
