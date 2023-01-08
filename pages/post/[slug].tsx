import React from 'react'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { sanityClient } from '../../sanity'
import { GetStaticProps } from 'next'
import { Post } from '../../typings'
import { urlFor} from '../../sanity'
import { EyeIcon } from '@heroicons/react/solid'
import PortableText from 'react-portable-text'
import CodeBlock from '../../components/CodeBlock'


interface Props {
  post: Post;
}

function Post({post}: Props) {
  
  
  return (
    <Layout>
        <Header />
        <div className=' pl-5 pr-5 pt-5'>
          <img 
            src={urlFor(post.mainImage).url()!}
            className='w-full h-40 object-cover mb-2'
          /> 
          <h4 className='w-full mb-1 text-2xl font-medium text-gray-900 md:text-2xl dark:text-gray-100'>{post.title}</h4>
          <div className=' flex items-center justify-between text-green-600'>
            <div className=' flex items-center'>
              <p className=' text-sm font-normal text-skin-base leading-5 pb-1'><span className=''>{new Date(post._createdAt).toLocaleDateString() }</span>, Published in Medium, DevTo and HashNode</p> 
            </div>
            <div className=' flex items-center space-x-2'>
              <p className=' text-sm font-normal text-skin-base leading-5 pt-1 pb-1'><span className=''>.2 mins read</span></p> 
              <div className='flex items-center space-x-1 mr-5 pr-5'>
                <EyeIcon className='h-5 w-5 text-gray-600 dark:text-gray-100' /> 
                  <p className=' text-sm font-normal text-skin-base leading-5 pt-1 pb-1'><span className=''>200</span></p> 
              </div>
            </div>
          </div>
          <p className="mt-3 mb-3 text-md font-normal text-skin-base text-gray-800 dark:text-gray-100 ">
            {post.description}
          </p>
          <div className='border-b-[1px] border-green-600 border-muted'></div>
          <div>
            <PortableText
              className='mt-5'
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="text-2xl font-bold my-5" {...props} />
                ),

                h2: (props: any) => (
                  <h1 className="text-xl font-bold my-5" {...props} />
                ),
                normal: (props: any) => (
                  <p className="my-2" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className=" text-blue-700 hover:underline my-5">
                    {children}
                  </a>
                ),
                codeBlock: (props: any) => {
                  return (
                    <div className=' mt-5 mb-5 text-sm'>
                      <CodeBlock code={props.code} language={props.language} />  
                    </div>
                  ) 
                },
              }}
            />
          </div>

 
        </div>
    </Layout>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
          current
        }
      }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
          name,
          image
        },
        description,
        mainImage,
        slug,
        body
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, itll update the old cached version
  };
};
