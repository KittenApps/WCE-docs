import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'All the wholesome FBC 5.8 features',
    description: (
      <>
        WCE - as a fork of the old FBC 5.8 - brings back all it's amazing features like the Animation Engine,
        chat links and embeds, friends online notifications, buttplug.io toy sync and more fixed and updated for the latest BC versions.
      </>
    ),
  },
  {
    title: 'New Anti Garble system',
    description: (
      <>
        It comes with a completely rewritten Anti Garble system supporting the latest changes in BC and giving the user even finer control over it.
        You should <a href="/docs/category/anti-garbling-system">read the docs</a> and
        try out the <a href="http://localhost:3333/docs/anti-garbling/simulator">Garble Simulator</a> showcasting it's features.
      </>
    ),
  },
  {
    title: 'Fixed bugs and new features',
    description: (
      <>
        It also fixes lot's of bugs in old FBC, which got broken through BC updates and improves some of it's features.
        Also it adds new features like the updated layering screen support, a local wardrobe extension, a clear cache button and more...
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4 margin-vert--sm')}>
      <div className="card card__body shadow--md text--center">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
