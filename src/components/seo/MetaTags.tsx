import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
}

const MetaTags = ({ title, description, keywords }: MetaTagsProps) => {
  const fullTitle = `${title} | Wismar.DEV`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default MetaTags;
