import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsGithub, BsLinkedin} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <>
      <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                <span className="px-2 mr-1 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white">
                  GoAsk.Dev
                </span>
                John
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Link to = '/about'>
                    <Footer.Link as={'div'}>
                      Johns Resume
                    </Footer.Link>
                  </Link>
                  <Footer.Link
                    href="/projects"
                    target="_blank"
                    rel="noopener noreferrer">
                    Projects
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow-Me" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://www.linkedin.com/in/johnarodriguez25/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </Footer.Link>
                  <Footer.Link
                    href="https://github.com/GoaskAlex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms &amp; Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="#" by = "John Rodriguez's Blog"  year = {new Date().getFullYear()}/>
            
            <div className="flex  gap-4 mt-2 sm:mt-0 sm:justify-center">
                <Footer.Icon href="https://www.linkedin.com/in/johnarodriguez25/" icon = {BsLinkedin}/>
                <Footer.Icon   href="https://github.com/GoaskAlex" icon = {BsGithub}/>
            </div>
            </div>
        </div>
      </Footer>
    </>
  );
}
