<template>
    <div :class="['Section','Howto'].join(' ')">
        <div class="Layout">
            <h2 class="Title">
                Create and sell your NFTs
            </h2>
            <div class="Steps">
                <div 
                    v-for="step in steps"
                    class="Step --observe"
                >
                    <div :class="['Step__no',`--${step.color}`].join(' ')">
                        <span>
                            <img
                                :src="step.icon"
                                :alt="['no-',step.no].join('')"
                                width="48"
                                height="48"
                                class="Image"
                            />
                        </span>
                    </div>
                    <h4 class="Step__title">
                        {{ step.no }}. {{ step.title }}
                    </h4>
                    <p class="Setp__desc">
                        {{ step.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const steps = [
    {
        no: 1,
        title: "CreateYourWallet",
        description: "Once you have created your wallet, you can connect using arweave.app or arConnect.",
        color: "purple",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyElEQVR4nO1bS2wcRRDtmK+wt2sdcCJ+J3JDfBw4wQVx4HtFkOAg7kAwTiKCT/aRQ/glgAgfoUAUjMUJst1rhDASiH/iIE6EcCCBiCAQEGPsqo1oVDOz657Z2dnZ2cXuGXhSy/Z6PO56XV39urpaiDYwwqzRgBuVxBEFNKaAdjrexriv3Gfuu8iK9/rNei3xKSXpRw1kctkk/aAlPjnTb9alNtwIs0YB7VAS51fdgJ4Rgac10La2HjErzPkK6ED0BQrwJw00xWxqwMedbl4faUoBnoohY78S5rykkT8QcaHDVVm7bUKYPpEzcJ8rpdrtWtJclIRYT1BAOyKj/sysMGeLnINtUIB7IiRsCz0002/WBfOkYbwoGBTgsw37JM5zkBd1cLS33b4IIx/rCZKOWCTsWp771lLHc14UFKpUu8Ma6BNeLKhIut6O9nkMeGkxLcxZ4dUBN4qqxHut4DCV9mWqjFcroNdYbChA8kUH7asM4lXCYWigaWsabBJVoO1N86LdS8o0qgHPxAsPPKMkbRWOQkl8IrQaqBJusQgYSfGCTe2UlwL8W0u8WzgIDThpDdZkEARxhKdCO6nIKkoBnrQM/axaohtm1pt+/so/2zq8pepyiYBO4CmrZeNPHgQzaP+ef7YJcnFF6YoAZalFBfhC/D+gvQ0CgLaLIhGgveDXmOt7Y5+R9OIySTQmCuUBsnZLJ1NAy9qtwjFoSeNWnBrPIie/t4NgZYBunB0yA/xVA35uB8FpYc4VjqEqFzcooG8V0FElF6/o6I+91Bjgr2mWQQVLd4kiQac3vlaV9JAoEhTgsG08f88jrCS9pIGOacAlJem4kvSqHsQrRZFwEPBaBfiLlV/7jTdQoiioysUN/ii2Ty4yEewNwkGoATPk6RSJH/grUau9SqMdY9tDm6E8Gl/PYmuJf6SxI9QkjTeWhWTj6ShPBeEYeFn2stWdGp5VCPUS/saKHtGAX2iJC0rinxrwU15B0uoHO88XjOhXuoT3vbN24VJOfvRcCfYK3EGvs61dc46fSXpHBWo3h7xU4tOtjHaKAMUjbyUnE0g4nOQJGvAj6/k30v7/1SdA0larA6iBHn33woVLuPHhZvBZnYQHY9+xduEyL+niv2NJX2AuzkzAhDB9nBVaqdNbDfSNFVx3NhnnP1Pv4CexRkjcbD2jOhmAJgKUlRJb6cajHu0gf7bsAXg6zogsecz/CWiXE9QrdoJL3yVOAUmPWeLr4+jvmxOzXU6BlQav83YQZBJaBUEl6YE0QTBuKjm9DOrmI+tm9SnpUOIyKPFDy5PeTFsOs+oEMLzRTtACbHy7UdVQuykia3fnQgjVwaOrS/Qwy99ACs/znGe3TyuF2egIcV+rMt5fHfzr8tRSuBq7HUZkaen6Qalf/NBc0pO+4WTydljSy66TEGyHuTTu939nOyzdJ4Hx9oC5iA87lcT3/XqH5IRIy6yw8Qsjn4+Q8EoeSOgZJoTp45Hv1BM4Y6SBXucR4OxwXmoGekICJzc8o3NYM9A1CXmvGeiKBF6z81QzYC37flY4KwlK0luBdn8uTzUDmQ9HTdzq0OzmztcMdCWFTXsSnK8Z6HovYKL5A0n78lQz0DonWMItWW5YxAVBl2sGEnOCKkWZXBwqEu/JS81A824QsicYQy8u02grIeRSzUBToaQOpZjTl8rGoVrGa7yYEJTPulgz0FQqOwN03X+pWFoD/mzZO+wvbbxpCT7kYkhRUOhS7U5LyB1vBP3golE9Us8V8cLEl8KcYx/IhuKdGjBD4QID3C0KBluy84lT6MoMgyNiJHLvKYIneCNvG8+tTKMtZC7tj2x4jvA1kzTpZicDHs/5SB0CX/JIPrSAMAmBN5ziwweOFQ7cDU4+ffbj2bQd7W3j227HTZBlta/R5b5xfItz+yTwXUJPNUk6seoGZGy+EMNdHORFVhjPI3CYFaPnGat9N7hNC7x3M1e1pdnc/QOPBSxdpeLMpAAAAABJRU5ErkJggg=="
    },
    { 
        no: 2,
        title: "CreateYourCollection",
        description: "Click on create collection to create a new collection on the RareWeave marketplace.",
        color: "green",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFb0lEQVR4nO1bSY8bRRSuyUKQAAWYruqAkIDgE/sAJ3JGbFdAWbiBxAUSZUBCSKCO4vdsorBoCBwmHIBRBIMRP2DClQs5kHBjyQGFyYRh0divHCEYRKPX3Z4pt5d47Kpue+Qnlbx0q6req1dfva2E6IfCcMKrwwNKFw8ojYclwasuGvfNY/BYPKbIm5RGXxK+qwguKo1hpo1wURK84+tAZc95GE7IevEVpVFnznhLA1K6OJ2ZRtwaBldLwk/TE5EEv0rCeV4VpfFNF437jsfA5dbx8VQhnNnhfuUpxTzBt7JeekyEwRa3g5vzCLZ4dXhcEZ5NC8GpJshY7c19OCPCYJvIi8JgmyI80awNxWknY/k6UPF+M5gfElIE7xtCYFzyrQ8iGe0Nte935WW1VGBNajnm+L9qqdC/JsA5A4/e6qufjhSGE+ZRF+35PklpPN8F1X/st1+vXnrCWKBfrGLB5GV4yET7QQBPafjJhQBEWNlqng6RsWSLlMb9BtLOD9IXq7kieKPlmCN8XVaLdww4z0pjnr7GvYP01Rn9CY6LISVJ+LahTS/b61jjkTUN0HhEDCk5m6ccCwDHGqDGWwDHGKDGIIjjU0COj0Ec2wHCMXX0GK/Y8KuRN4RkHe6XGv4YNFY4kgLw6uUpG8wnkaEDIyUAL8W81Pin0nCszwDqfqvxAOlYAG3UfoVjEGJYSDoUwNAz71IAI8G8KwGMDPODCICzSHGwsjjtaTioND7CsbsY8Bjk1gHPagyvJQSHL0TJVYLnVbW8OxMB+Br3KsKlNimsn7NgPsljfKkI/ktlsvh35eZaadKZAJTGQz0aK06Y30UoOcLcfXz4oWchyA0IQGm8VxH8uy5xXJIaZ7mlNUJqeNoW081zgC9Sq74QJW0JFlLaOG9fAARzxrvf7FwJrm8821kt3yAJzhjPP7TAb/P41fLuZrVvtgiTIo617eCvFG+3LABcXHu3Vny4pS/CPcYqnO8IXN0zSL01goW2/ROcbrzjEz5nVQCS8O/Gu5O/H7su/Zz/M1Twr3Z9cEzfhj/QKUfI/xvvvJabBkjCC501oGsKrVcBnM5cAxThJ8YEzvC+74QBSuNHIncMKN9m+RQ4ek/zKQCXpIaT3Pi7cTqs+vroXRZ47pojbGhCXF6zvvLJ/585sQOkxpdaDJCUMSI1vCgc0U0UeHzOX2GLfH9LNbjRmSXoaXzGxANj5Rcl4VPCMSXGUKWdJcgr3zPzg/gCXLXFxRRxgSMelnV49M4wuEpkSJxyZx+AfQEGvJ72fF4hscSKnIs0h3A1/oQ5WS/fJ/IkmYEAIv/BBM/mbbPKz8VmFYDPnmMP5zrjithsAiiEMztMJ4n9Bzag/EvHr+FP/m0A2MWsMcS5AKKKz3VVXzINJyb+nfIiP+ihqvzZkYkKK8PuZ5e5/fhwctPmBZQjAYxMZsjb6BaIfY0OCRH4euQEUIhA0KhCZRAk3COXg2ujT9N5IlzsBoIjWyXmRWZzF9+hxxCas3kqc59aL0RucqA6GELwDz/fWKGkxbJ5pYv7bJXKdiNf492K4GMOlDDTXPTMv9nFzrVU1rtcftBWsbQz4mJpDb+tWY318pTlcnlcc20ZucWQkVeDJw0tvWD96oyML0M10Phsrldl0hTObpcE3znFqV1xgKFmANN7YkiIzeN18Iuu9fiOBipOp9zUE/lemprd3sx81A65vjZ3KnVEneMMMIOQu4HT86hs5T1vqn0ylznnYxc4zJUWQgw8y4rg8yT66uTucIJDFRPtTebdX5w0T4Uozmdco8uv1XKLFvk6UJH1xQZLxozzUcdoz+AscqeQr8+XpxKLkSPATu4OJ9fn93F5jasrsv8DhKYLHp3ees0AAAAASUVORK5CYII="
    },
    { 
        no: 3,
        title: "AddYourNFTs",
        description: "Click on Mint NFTs to upload and create your NFTs and add them to your collection.",
        color: "blue",
        icon: "data:image/png;base64,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"
    },
    {
        no: 4,
        title: "SellNftsAndEarn",
        description: "Promote your collection and sell your NFTs via the RareWeave marketplace. Earn.",
        color: "red",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFbklEQVR4nO1aS4hcRRStGNEk4IcZYd659UJDHH/xg6MmmoULdSH4iUYXQUUXgigokomKG5UYI8xeFJNIRomCa7OSiIIoGMSNn0WiJiTRiJ/JZJy+1a0Yn9w33eN93T3d/b7dM+mCx3xe1b3nnld169ata0xDC4BVTLTREW11wPNxHrZ2XMaKDJNxyx1XYMwyR/SMA6YdUZDqAaZFqchMbXgRuAJjljHRu6kVNDxMtDcNCYXhcsJwtMOPjmgnE03EeWpjDkdkAVuSElAIrgBYpacXA3uCUmlF4q9WKq1gYFJNu5OB76+MLacoXEx0t2Y4jZKIMsV42do748ooDJcjelax8qbJqDmiXWrKbU0wvhhcDGxT02xbVorSyi0MFw8IwGAGuMESoLzX2v7Y4auMWSo+wKWN3AYEYHHPACb6LG74KmOWzAzgQRyAQSBkCp5BXcvlM30JuOiZe2dWihzR7nlF1o4nGF8MLj7Tj8NBc+JhMoPEw9vqKDuVUUIkP1xs7XhD6klY2hU3fJUxTHSkIYp7OinownAFc8nHvVmFrkrJOxkkRYvBFYgyYIvkylIrAaaE4azS4oXiCnx/ZZnortplwsLhaavw1tpxGZtkzXckoh9wcU57c9pWGC4eEIDBDHCDJUA98QFhIGPtjc7zHnZEz4VpM6InGLhH3/gsKR8QjI6eKwYz0YcMVLrc4ycDY85e1AQExixn4CkHnEgU6BAdLgOPBcactegIqBJd5oi+WuDrfu+AD+o3xPJT/mbghwWI+LSyevXFi4aAsrV3MNFsgyG/OqIXZkdGrmw3dnZk5CpH9GKtvyZhpmLtrX1PAHvefQz8reRXGHg5GB4+L44c6c/Adu0zGKiKs+xbAhxws4BUMfvP7PvrU2GVHUP5EAZcGbiu7wj4E7jIAT8puYfY920WstlaP/Qb/y+Ho6d8fyhxNRZHr6v2Z1El1pCkmBYnaDJsVc+7wgGnlI7X+6ZKrEw0xkT/qi+00eTQGNikdPwza+01fVElxsD7ekblYbzS9bHStSfy0vWgSmyGaJiBv1S/67MyVvZ+WcI6BmDPW6fs4+lS6cKeVok5ax9Rfb42GTVZVg74o+5QIzqJvlUfZ3P4z16lxYVoRfp2k7HxNbkHG3TuUAS8lvcFRNsqMUf0Zf19xdpbsjZefi8TXav7VIhuU+8PhP/s1dWYI/q9/r5KdGnexqtzxnxMYLoBmrR1kqsd4ELhrjgxCWTkaWVQHOOliR7tCE03QHMjgIg7ERBZnnOGjbUwfqob45sIAKpdAc1xBhzrtATC7az5644lMb5xCcip0RRIQHOVGNEvygkueFwVoxpImAq30JjGt3CCXxRGQMeIEXilnawmEqJhd1fGh5iIXlVjdzcB7WGZ3Ded5LUkIYbxISai79TYB5uAFl4lppMWnndDLBLiGu/765WdlflQmHtYIsNEb6k+H3UjN9warR2Pm+tj4BP1Qd6LBTRJ60au5PGY6LTqlz5t1QqL592vjD896/tXxwKapHUr1wFvKHAznZKfcVsVuDySEKk7v7hA47Zu5QZDQ+c74Ljqe0hSWbmkxIBjTSkx16PDUASo561jorLy0CfY2ptS6t+gY42aw93QrJz6o0osLH5oTovvkBkSR/fJNWsukP1eZ5lFLgP3tgaL/qkSk2NxJMKbe35zRC9FHFeLJnk+6adPmXW/UgZub6uY+6hKrGrtJQx83jJiFFzAvpqeiRrGfY1pOEX+gYrvj3ZUGvRZlZiMqRA9qg9MsR7gOHve47EuR4M+rBKr3RJvCi9AiWbaki1OVGYH8ECwdu05eVVjTbR98qwSM2Z5eAQm2sxET9aWnNxjPCS7SFKj/wNt+twDjMtglwAAAABJRU5ErkJggg=="
    }
    
];
</script>

<style scoped>
    .Howto {
        position: relative;        
    }

    .Layout {
        justify-content: center;
    }

    .Title {
        /* font-size: 24px;
        font-weight: 600;
        color: var(--text-primary); */
        margin-bottom: 24px;
    }

    .Steps {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
    }

    .Step {
        flex: 1 1 0px;
        min-width: 286px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .Step__no {
        position: relative;
        padding: 1rem; 
        border-radius: 50%;
        background: rgba(234,201,189,1);
        aspect-ratio: 1/1;
        width: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .Step__no::before {
        content: '';
        position: absolute;
        inset: -16px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 1);
        z-index: -1;
        padding: 16px;
    }
    
    .Step__title {
        font-size: 18px;
        font-weight: 800;
        color: white;
        margin: 2rem 0 1rem;
    }

    .--purple {
        background: rgba(207, 130, 235, 0.918);
    }
    .--green {
        background: rgba(138, 245, 165, 0.719);
    }
    .--blue {
        background: rgba(128, 194, 238, 0.877);
    }
    .--red {
        background: rgba(241, 127, 127, 0.918);
    }
</style>